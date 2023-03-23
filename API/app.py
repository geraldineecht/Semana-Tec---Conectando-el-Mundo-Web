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


@app.route("/create_user", methods=["POST"])
def create_user():
    """Creates a new user in the database with empty parameters"""

    if request.method == "GET":
        return {
            "success": False,
            "message": "Unsupported method"
        }
    
    username = request.json.get("username")
    if username is None:
        return {"data": {"success" : False, "message" : "must specify a username"}}
    
    # TODO: Check if username is already used
    
    email = request.json.get("email")
    if email is None:
        return {"data": {"success" : False, "message" : "must specify an email"}}
    
    # TODO: Check if email is already used
    # TODO: Check if it's a valid email

    newUser = {
        "username": username,
        "email": email,
        "lists": [
            {
                "listName": "",
                "type": "movies",
                "description": "",
                "dateOfCreation": datetime.now(),
                "idsCollection": []
            },
            {
                "listName": "",
                "type": "songs",
                "description": "",
                "dateOfCreation": datetime.now(),
                "idsCollection": []
            },
            {
                "listName": "",
                "type": "books",
                "description": "",
                "dateOfCreation": datetime.now(),
                "idsCollection": []
            }
        ],
        "followedUsers": []
    }
    
    collection = db['Users']
    collection.insert_one(newUser)

    return {"data": { "success" : True, "message" : "user was created"}}


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
        return {"data": {"success" : False, "message" : "must provide a user"}}
    
    # TODO: Check if it's a valid user id and they exist
    # TODO: check if everything exists, if not create it

    listType = request.json.get("listType")
    if listType is None or listType != "movies":
        return {"data": {"success" : False, "message" : "must specify which list to update"}}

    movieTitle = request.json.get("movieTitle")
    if movieTitle is None:
        return {"data": {"success" : False, "message" : "must specify a movie to add"}}
    
    movieYear = request.json.get("movieYear")
    if movieYear is None:
        return {"data": {"success" : False, "message" : "must specify the year of the movie to add"}}
    
    collection = db['Users']
    mongoFilter = {'_id': ObjectId(userId), "lists.type": "movies"}
    collection.update_one(mongoFilter, 
        {"$push":
            {"lists.$.idsCollection": {"movieTitle": movieTitle, "movieYear": movieYear, "dateAdded": datetime.now()}}
        })

    return {"data": { "success" : True, "message" : "movie was added to user list"}}


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
        return {"data": {"success" : False, "message" : "must provide a user"}}
    
    # TODO: Check if it's a valid user id and they exist
    # TODO: check if everything exists, if not create it

    listType = request.json.get("listType")
    if listType is None or listType != "songs":
        return {"data": {"success" : False, "message" : "must specify which list to update"}}

    songId = request.json.get("songId")
    if songId is None:
        return {"data": {"success" : False, "message" : "must specify a song to add"}}
    
    collection = db['Users']
    mongoFilter = {'_id': ObjectId(userId), "lists.type": "songs"}
    collection.update_one(mongoFilter, 
        {"$push":
            {"lists.$.idsCollection": {"id": songId, "dateAdded": datetime.now()}}
        })

    return {"data": { "success" : True, "message" : "song was added to user list"}}


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
        return {"data": {"success" : False, "message" : "must provide a user"}}
    
    # TODO: Check if it's a valid user id and they exist
    # TODO: check if everything exists, if not create it

    listType = request.json.get("listType")
    if listType is None or listType != "books":
        return {"data": {"success" : False, "message" : "must specify which list to update"}}

    bookName = request.json.get("bookName")
    if bookName is None:
        return {"data": {"success" : False, "message" : "must specify the book name to add"}}
    
    bookAuthor = request.json.get("bookAuthor")
    if bookAuthor is None:
        return {"data": {"success" : False, "message" : "must specify the author of the book to add"}}
    
    collection = db['Users']
    mongoFilter = {'_id': ObjectId(userId), "lists.type": "books"}
    collection.update_one(mongoFilter,
        {"$push":
            {"lists.$.idsCollection": {"bookName": bookName, "bookAuthor": bookAuthor, "dateAdded": datetime.now()}}
        })

    return {"data": { "success" : True, "message" : "book was added to user list"}}


@app.route('/get_friend_movies_recommendations', methods=["GET"])
def get_friend_movies_recommendations():

    if request.method == "POST":
        return {
            "success": False,
            "message": "Unsupported method"
        }
    
    userId = request.args.get("userId")
    if userId is None:
        return {"data": {"success" : False, "message" : "must provide a user"}}
    
    userObjectId = ObjectId(userId)
    # TODO: Check if user exists in the database

    # Get friend IDs
    collection = db['Users']
    userFilter = {'_id': userObjectId}
    query = collection.find_one(userFilter, {"followedUsers": 1})
    friendIds = query["followedUsers"]
    
    # Get recomendations of friends
    for id in friendIds:
        movieObject = collection.find_one({'_id': id}, 
            {"lists":
                {"$elemMatch": {"type": "movies"}}
            })
        print(movieObject["lists"])

    recommendations = {
        "wow": "omg"
    }

    return recommendations


@app.route('/get_friend_songs_recommendations', methods=["GET"])
def get_friend_songs_recommendations():
    pass


@app.route('/get_friend_books_recommendations', methods=["GET"])
def get_friend_books_recommendations():
    pass


if __name__ == '__main__':
    app.run(debug = True, port = 3000)