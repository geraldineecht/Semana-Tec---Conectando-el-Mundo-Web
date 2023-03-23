# API - Les Power Rangers Divinas

from flask import Flask, request
from bson.objectid import ObjectId
from datetime import datetime
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


@app.route('/add_movie', methods=["POST"])
def add_movie():
    """Adds a movie to a user's list"""

    if request.method == "GET":
        return {
            "success": False,
            "message": "Unsupported method"
        }
    
    userId = request.json.get("userId")
    if userId is None:
        return {"success" : False, "message" : "must provide a user"}
    
    # TODO: Check if it's a valid user id and they exist
    # TODO: check if everything exists, if not create it

    listType = request.json.get("listType")
    if listType is None or listType != "movies":
        return {"success" : False, "message" : "must specify which list to update"}

    movieId = request.json.get("movieId")
    if movieId is None:
        return {"success" : False, "message" : "must specify a movie to add"}
    
    collection = db['Users']
    mongoFilter = {'_id': ObjectId(userId), "lists.type": "movies"}
    collection.update_one(mongoFilter, 
        {"$push":
            {"lists.$.idsCollection": {"id": movieId, "dateAdded": datetime.now()}}
        })

    return { "success" : True, "message" : "movie was added to user list"}


@app.route('/add_song', methods=["POST"])
def add_song():
    """Adds a song to a user's list"""

    if request.method == "GET":
        return {
            "success": False,
            "message": "Unsupported method"
        }
    
    userId = request.json.get("userId")
    if userId is None:
        return {"success" : False, "message" : "must provide a user"}
    
    # TODO: Check if it's a valid user id and they exist
    # TODO: check if everything exists, if not create it

    listType = request.json.get("listType")
    if listType is None or listType != "songs":
        return {"success" : False, "message" : "must specify which list to update"}

    songId = request.json.get("songId")
    if songId is None:
        return {"success" : False, "message" : "must specify a song to add"}
    
    collection = db['Users']
    mongoFilter = {'_id': ObjectId(userId), "lists.type": "songs"}
    collection.update_one(mongoFilter, 
        {"$push":
            {"lists.$.idsCollection": {"id": songId, "dateAdded": datetime.now()}}
        })

    return { "success" : True, "message" : "song was added to user list"}


@app.route('/add_book', methods=["POST"])
def add_book():
    """Adds a book to a user's list"""

    if request.method == "GET":
        return {
            "success": False,
            "message": "Unsupported method"
        }
    
    userId = request.json.get("userId")
    if userId is None:
        return {"success" : False, "message" : "must provide a user"}
    
    # TODO: Check if it's a valid user id and they exist
    # TODO: check if everything exists, if not create it

    listType = request.json.get("listType")
    if listType is None or listType != "books":
        return {"success" : False, "message" : "must specify which list to update"}

    bookName = request.json.get("bookName")
    if bookName is None:
        return {"success" : False, "message" : "must specify the book name to add"}
    
    bookAuthor = request.json.get("bookAuthor")
    if bookAuthor is None:
        return {"success" : False, "message" : "must specify the author of the book to add"}
    
    collection = db['Users']
    mongoFilter = {'_id': ObjectId(userId), "lists.type": "books"}
    collection.update_one(mongoFilter,
        {"$push":
            {"lists.$.idsCollection": {"bookName": bookName, "bookAuthor": bookAuthor, "dateAdded": datetime.now()}}
        })

    return { "success" : True, "message" : "book was added to user list"}


if __name__ == '__main__':
    app.run(debug = True, port = 3000)