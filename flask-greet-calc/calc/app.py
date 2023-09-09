from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route('/add')
def do_add():
    """Add a and b"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    return f"{a + b}"

@app.route('/sub')
def do_sub():
    """Subtract b from a"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    return f"{a - b}"

@app.route('/mult')
def do_mult():
    """Multiply a and b"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    return f"{a * b}"

@app.route('/div')
def do_div():
    """Divide a by b"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    return f"{a / b}"

operators = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div
}

@app.route('/math/<operator>')
def do_math(operator):
    """Do math on a and b"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    return f"{operators[operator](a, b)}"



    