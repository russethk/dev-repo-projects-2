
from flask import Flask, render_template, request, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
import requests

from forex_python.converter import CurrencyRates
from forex_python.converter import CurrencyCodes
import datetime


app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"
app.debug = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

url = 'https://api.exchangerate.host/'
response = requests.get(url)
data = response.json()



@app.route('/')
def index():
    return render_template("index.html")


@app.route('/results',methods=["POST"])
def process():
        fromCurrency = request.form.get("fromCurrency")
        toCurrency = request.form.get("toCurrency")
        amount = request.form.get('amount', type=float)

        c = CurrencyRates()
        d = CurrencyCodes()
        datetime_obj = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

        if amount is None:
            flash('Please enter a valid amount.')
            return redirect('/')
        elif fromCurrency == toCurrency:
            flash('Please select two different currencies.')
            return redirect('/')

        try:
            result = round(c.convert(fromCurrency, toCurrency, amount), 2)
            fromSymbol = d.get_symbol(fromCurrency)
            toSymbol = d.get_symbol(toCurrency)
            currencyInfo ={"fromCurrency":fromCurrency,"toCurrency":toCurrency,"amount":amount,"result":result,"fromSymbol":fromSymbol,"toSymbol":toSymbol,"datetime_obj":datetime_obj} 
            return render_template("/results.html",info=currencyInfo)
        except KeyError:
            message = f"{fromCurrency} is not a valid currency code."
            flash(message)
            return redirect('/')
        except:
            message = f"{toCurrency} is not a valid currency code."
            flash(message)
            return redirect('/')
        

if __name__=="__main__":
    app.run(debug=True)
        
        
        
       
       

