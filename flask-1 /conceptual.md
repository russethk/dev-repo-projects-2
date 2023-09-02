### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

  1. Python is used primmarily for back-end web development, while JavaScript 
     is used for both backend and frontend development.  

  2. The syntax of the language differs between the two languages. 
    - **Codeblocks**:  Python relies on strict indentation rules for codeblocks,  
      while JavaScript codeblocks are delimited through use of beginning and ending  
      curly braces to define the confines of the codeblock.
    - **Variable definitions**: In Python, define the variable by writing the name of the  
      variable, followed by an equal sign, with the value to be assigned to the variable.
      In JavaScript, place a keyword **var** or **let** before the variable name. 
    - **Constants**: In JavaScript, the value of constants cannot be redefined, whereas  
      in Python, the value of a declared contant can be redefined and the variable identifier can
      be reassigned. 
    - **Data Structures**: 
      - Python uses the **list** to store sequences of values in the same data structure. They can be  
        modified, indexed, sliced, and used as a data source for functions in the program.
      - The similar data structure in JavaScript is an **array**.
      - In Python, the **dictionary** object is used to hold key-value pairs that can be used to map  
        values to other values. This functions as a hash table.  
      - The Python **tuple** is similar to a list, the value of the data stored in the tuple can not be changed  
        during program execution. It is used to store data that should not be modified.
    - **Logical Operators**: 
        - The three logical operators in Python are: and, or, and not.
        - The three logical operators in JavaScript are: &&, ||, and ! .
    - **For Loops**
        - Python: write the keyword **for** followed by the name of the loop variable, the keyword **in**,   
          and a call to the **range()** function specifying the necessary parameter(s). Then, write a colon :  
          followed by the body of the loop indented.
          for i in range(n):
            code block
        - JavaScript: Start with the for keyword followed by parentheses. Within the parentheses, define the loop variable  
          with an initial value. Iterate the value of the variable. The loop stops when the loop condition is False.
          Use curly braces to create a code block and within the braces, write the body of the loop indented.
          for (var i == 0; i < n, i++> ) {
            code block
          }
    - **Defining Funcitonss**
        - Python: write the keyword **def** followed by the name of the function, and within parentheses place the parameters list.  
          Follow the list with a colon **:** and the body of the function indented.
        - JavaScript: Define a function using the **function** keyword and surround the body of the function with curly braces.
          

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.

  1. Use .setdefault()
  **setdefault(key[, default])**

  If key is in the dictionary, return its value. If not, insert key with a value of default and return default.
  default defaults to **None**.
  
  2. Use .get()
  **get(key[, default])**

  Return the value for **key** if **key** is in the dictionary, with an **else** of default. If default is not given,
  it defaults to **None**. This method never raises a KeyError.


- What is a unit test?    
  A **unit test** is code that is used to test a unit of code, typically a function, to test to make sure the unit of code in the  
  program work as intended. It's used primarily for bug testing during development. 

- What is an integration test?
  An **integration test** is used to test the interoperability of the program, testing the different units, modules and 
  components as a combined entity. An integration test is used to test that the program works as a whole, testing that
  the various components are interconnected and the program as a whole works as intended.   

- What is the role of web application framework, like Flask?
  A **web application framework** is a software framework that is designed to support the development of web applications including web services, web resources, and web APIs. It provides developers with pre-built tools and libraries to help speed and simplify 
  the development process. 

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

  Pass the parameter in a **route URL** if you want to extend the URL to point to, or redirect the user to, another page.  

  Use a **URL query** parameters to pass data to the application or server. You would use this method for a **GET Request**, to provide these arguments as a dictionary of strings.


- How do you collect data from a URL placeholder parameter using Flask?  
  
  Create a variable URL by adding <name> placeholders in the URL and accepting corresponding **name** arguments in the view function.  For example: 
  > @app.route('/landingpage<id>') 
  > def landing_page(id):
  >  ...

- How do you collect data from the query string using Flask?  
  
  To access a parameter passed in the query string, use request.args.get('param'). if you want to access the query string itself, accessing the query_string property of the request object. Use request.query_string as in the example:
  > @app.route('/data', methods=['GET'])
  > def get_query_string():
  >  return request.query_string

- How do you collect data from the body of the request using Flask?  

  To get the raw post body regardless of the content type, use request.get_data().

- What is a cookie and what kinds of things are they commonly used for?  
  Cookies are placed dynamically on a user's web browser client. They are used to store data to be used at a later time. 
  **Session cookies** are used to store small amounts of information from a web browser session used during that sessions. They are used to store data gathered during the user's session on the website, allowing websites to 'remember' what pages they have visited when they move between web pages. They are used in e-commerce sites, to store data in 'shopping carts' for future retrieval and/or to facilitate transactions.
  **Persistent cookies** are cookies that remain on a user's device even after they close their browser. They typically have an expiration date are used to store information that can be accessed across multiple browsing sessions. Persistent cookies are used for storing data that is frequently repeated, such as personal data in web forms. They are used to store individual users' browsing history, preferences, and settings. They are used in e-commerce sites, to store data in 'shopping carts' for future retrieval and/or to facilitate transactions.

- What is the session object in Flask?
  
  The session is used to store user-specific data between requests, similar to cookies. The session object of the flask package is used to set and get session data. It works like a dictionary but it can also keep and track modifications to the data.

- What does Flask's `jsonify()` do?  

  The Flask jsonify() function returns a Response object. Flask serializes the data as JSON and adds it to this Response object. It converts a JSON output into a response object with application/json mimetype. It helps in the conversion of multiple arguments to an array or multiple arguments into a dictionary.
