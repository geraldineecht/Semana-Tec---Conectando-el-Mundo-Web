# API - Les Power Rangers Divinas

from flask import Flask, request
import database as dbase

app = Flask(__name__)
db = dbase.connectionDB()

# Routes
@app.route('/home')
def home():
    return "Les Power Rangers Divinas!\n"

@app.route('/users', methods = ['GET'])
def get_users():
    try: 
        query = db.Users.find({"username":'alex_dennis'}) 
        for x in query:
            print (x)
        return "oli"

    except Exception as e:
        print(e)
        return "oli2"

if __name__ == '__main__':
    app.run(debug = True, port = 3000)