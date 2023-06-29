// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

// Declare global variables

let categories = [];
const BASE_URL = `http://jservice.io/`;
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS = 5;

class Category {
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
  static async getCategoryIds() {
    let response = await axios.get(`${BASE_URL}api/categories`, {
      params: {
          count: "150",
          offset: Math.floor(Math.random() * (150 - 1) + 1) // random number between 1 and 150, varies offset between each request
        }
    });

    // lodash selects 6 random categories from the response
    let randomCategories = _.sampleSize(response.data, NUM_CATEGORIES)

    // make new array with only the category ids
    let categoryIds = randomCategories.map((catObj) => {
        return catObj.id;
    });

    return categoryIds;
  }

  // fill categories array with 6 objects, each with 5 questions
  static async getAllCategoriesAndQuestions() {
    categories = [];
    let categoryIds = await Category.getCategoryIds();
    for (let categoryId of categoryIds) {
      let fullCategory = await Category.getCategory(categoryId);
      categories.push(fullCategory);
    }
    return categories;
  }

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
  static async getCategory(catId) {
    let response = await axios.get(`${BASE_URL}api/clues`, {
      params: {
        category: catId,
    },
  });

  // lodash selects 5 random clues (questions) from the response
  let randomQuestions = _.sampleSize(response.data, NUM_QUESTIONS);

  // format each question object inside the array
  let questionArray = randomQuestions.map((question) => {
    if (question.answer.startsWith("<i>")) {
      question.answer = question.answer.slice(3, -4);
    }
    return {
      question: question.question,
      answer: question.answer,
      showing: null,
    }
  });

  let categoryQuestions = {
    title: response.data[0].category.title, // get category title from first question
    clues: questionArray,
    }
  return categoryQuestions;
  }
}

$(async function () {
  const $button = $("button");
  const $tDiv = $("#table-container");

  // format category titles
  function toTitleCase(str) {
    return str.replace(
      /[^A-Z0-9,:;\-.?! ]/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

  async function fillTable() {
    let $tHead = $("<thead>");
    let $tBody = $("<tbody>");
    let $table = $("<table>")
      .prepend($tHead)
      .append($tBody);

    // generate each table cell with '?', add coordinates ID, appent to row, row appends to tbody

    for (let j = 0; j < NUM_QUESTIONS; j++) {
      let $tRow = $("<tr>");
      for (let i = 0; i < NUM_CATEGORIES; i++) {
        let $qMark = $("<i>")
          .attr("class", "far fa-question-circle");
        let $tCell = $("<td>")
          .attr("id", `${i}-${j}`)
          .append($qMark);
        $tRow.append($tCell);
      }
      $tBody.append($tRow);
    }

    // generate each table header cell with category title, append to thead
    for (let k = 0; k < NUM_CATEGORIES; k++) {
      let tCell = $("<th>")
        .attr("id", `cat-${k}`)
        .text(toTitleCase(categories[k].title));
      $tHead.append(tCell);
    }
    // append table to table-container div
    $tDiv.append($table);
  }

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

  function handleCellClick(id) {
    let $clickedCell = $(`#${id}`);
    let category = id.slice(0, 1);
    let question = id.slice(2);

    // shorthand variables for game data
    let clueCell = categories[category].clues[question];
    let questionText = clueCell.question;
    let answerText = clueCell.answer;

    // if cell is empty, show question
    if (clueCell.showing === null) { // show question
      $clickedCell.text(questionText); 
      clueCell.showing = "question";
    } 
    else if (clueCell.showing === "question") { // show answer
      $clickedCell.toggleClass("answer");
      $clickedCell.text(answerText);
      clueCell.showing = "answer";
      $clickedCell.toggleClass("not-allowed");
    }
  }

  /** Wipe the current Jeopardy board, show the loading spinner,
  * and update the button used to fetch data.
  */

  function showLoadingView() {
    $button.text("Loading...").toggleClass("not-allowed");
    $tDiv.empty(); // clear game board table
    let $loading = $("<i>")
      .attr("class", "fas fa-spinner fa-pulse loader");
    $tDiv.append($loading);
  }

  /** Remove the loading spinner and update the button used to fetch data. */

  function hideLoadingView() {
    $button.text("Restart").toggleClass("not-allowed");
    $tDiv.empty(); // clear loading icon before table is generated
  }

  /** Start game:
  *
  * - get random category Ids
  * - get data for each category
  * - create HTML table
  * */

  async function setupAndStart() {
    showLoadingView();
    await Category.getAllCategoriesAndQuestions(); // call API and fill categories array
    hideLoadingView(); // clear loading screen
    fillTable(); // table creation and labeling
    addListeners(); // add event listeners to each cell in table
  }

  /** On click of start / restart button, set up game. */

  $button.on("click", async () => {
    setupAndStart();
  });

  /** On page load, add event handler for clicking clues */
  async function addListeners() {
    const $gameTable = $("table");
    $gameTable.on("click", "td", (evt) => {
      handleCellClick(evt.target.id);
    });
  }
});

