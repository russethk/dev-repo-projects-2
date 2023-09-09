from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)

app.config['SECRET_KEY'] = "oh-so-secret123"
debug = DebugToolbarExtension(app)


@app.route('/welcome')
def welcome():
    html = """
    <html>
        <body>
            <h1>welcome</h1>
        </body>
    </html>
    """
    return html

@app.route('/welcome/home')
def welcome_home():
    html = """
    <html>
        <body>
            <h1>welcome home</h1>
        </body>
    </html>
    """
    return html

@app.route('/welcome/back')
def welcome_back():
    html = """
    <html>
        <body>
            <h1>welcome back</h1>
        </body>
    </html>
    """
    return html

