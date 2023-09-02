from unittest import TestCase
from app import app

# Make Flask errors be real errors, not HTML pages with error info
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class CurrencyConverterTestCase(TestCase):

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        with self.client:
            result = self.client.get('/')
            html = result.get_data(as_text=True)

            self.assertEqual(result.status_code, 200)
            self.assertIn('</i> Currency Converter</h1>', html)

    def test_results(self):
        with self.client:
            result = self.client.post('/results', data={'fromCurrency': 'USD', 'toCurrency': 'GBP', 'amount': 1})
            html = result.get_data(as_text=True)
            self.assertEqual(result.status_code, 200)

            self.assertIn('<h2 class="heading display-6">Results</h2>', html)
            
    def test_convert(self):
        with self.client:
            result = self.client.post('/results', data={'fromCurrency': 'USD', 'toCurrency': 'EUR', 'amount': 1})
            info = {'fromCurrency': 'USD', 'toCurrency': 'EUR', 'amount': 1.0, 'result': 0.91, 'fromSymbol': '$', 'toSymbol': '€', 'datetime_obj': '2023-08-06 15:44:19'}
            self.assertEqual(result.status_code, 200)

            self.assertEqual(info['result'], 0.91)
            
            

