# API - Les Power Rangers Divinas

from flask import Flask, request, jsonify, Response
from bson import json_util, ObjectId
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
    """Gets all recommendations from a user's friends"""

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
    friendRecommendations = []
    for id in friendIds:
        query = collection.find_one({'_id': id}, 
            {"lists":
                {"$elemMatch": {"type": "movies"}}
            })
        
        movies = query["lists"][0]["idsCollection"]
        friendUsername = collection.find_one({'_id': id}, {"username": 1})["username"]
        for movie in movies:
            recommendation = {
                "movieTitle": movie["movieTitle"],
                "movieYear": movie["movieYear"],
                "friendName": friendUsername,
                "dateAdded": movie["dateAdded"].strftime("%m/%d/%Y, %H:%M:%S")
            }
            friendRecommendations.append(recommendation)

    return {"friendRecommendations": friendRecommendations}


@app.route('/get_friend_songs_recommendations', methods=["GET"])
def get_friend_songs_recommendations():
    """Gets all recommendations from a user's friends"""

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
    friendRecommendations = []
    for id in friendIds:
        query = collection.find_one({'_id': id}, 
            {"lists":
                {"$elemMatch": {"type": "songs"}}
            })
        
        songs = query["lists"][0]["idsCollection"]
        friendUsername = collection.find_one({'_id': id}, {"username": 1})["username"]
        for song in songs:
            recommendation = {
                "songId": song["id"],
                "friendName": friendUsername,
                "dateAdded": song["dateAdded"].strftime("%m/%d/%Y, %H:%M:%S")
            }
            friendRecommendations.append(recommendation)

    return {"friendRecommendations": friendRecommendations}


@app.route('/get_friend_books_recommendations', methods=["GET"])
def get_friend_books_recommendations():
    """Gets all recommendations from a user's friends"""

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
    friendRecommendations = []
    for id in friendIds:
        query = collection.find_one({'_id': id}, 
            {"lists":
                {"$elemMatch": {"type": "books"}}
            })
        
        books = query["lists"][0]["idsCollection"]
        friendUsername = collection.find_one({'_id': id}, {"username": 1})["username"]
        for book in books:
            recommendation = {
                "bookTitle": book["bookTitle"],
                "bookAuthor": book["bookAuthor"],
                "friendName": friendUsername,
                "dateAdded": book["dateAdded"].strftime("%m/%d/%Y, %H:%M:%S")
            }
            friendRecommendations.append(recommendation)

    return {"friendRecommendations": friendRecommendations}

@app.route('/movies/<id>', methods = ['GET'])
def get_all_movies(id):
    try: 
        #query = db.Users.find_one({"_id": ObjectId(id)}, {'lists':1, '_id':0}) 
        query = db.Users.find_one({"_id": ObjectId(id), "lists.type": "movies"}, {'lists.idsCollection':1, '_id':0})
        response = json_util.dumps(query)
        return Response(response, mimetype='application/json')

    except Exception as e:
        print(e)
        return not_found()


@app.errorhandler(404)
def not_found(error=None):
    response = jsonify({
        'message': 'Resource Not Found: '+ request.url,
        'status': 404
    })
    response.status_code = 404
    return response


if __name__ == '__main__':
    app.run(debug = True, port = 3000)