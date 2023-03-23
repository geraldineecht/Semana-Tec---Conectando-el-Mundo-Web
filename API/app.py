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
        collection_name = db['Users']
        #myquery = { "address": { "$regex": "^S" } }

        #mydoc = collection_name.find(myquery)
        query = collection_name.find_one({"username":"alex_dennis"}) 
        for x in query:
            print (x)

    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug = True, port = 3000)