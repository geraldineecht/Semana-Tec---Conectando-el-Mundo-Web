#Conexión con la base de datos (MONGO DB)

# pip install pymongo
# pip install certifi

from pymongo import MongoClient
import certifi

MONGO_URI = "mongodb+srv://<username>:<password>@tecomparto.ozoties.mongodb.net/?retryWrites=true&w=majority"
ca = certifi.where()

def connectionDB():
    try:
        client = MongoClient(MONGO_URI, tlsCAFile = ca)
        db = client.TEComparto
        return db
    except ConnectionError as e:
        print("Cannot connect to DB!: {}".format(e))