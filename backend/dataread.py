import csv
import pymongo
url='mongodb+srv://elmos:elmos1234@cluster0.ajxyefd.mongodb.net/?retryWrites=true&w=majority';

client=pymongo.MongoClient(url);

db=client["movies"]

collection=db["moviesData"]

with open('./imdb_top_1000.csv','r') as file:
    reader=csv.DictReader(file)
    
    for row in reader:
        collection.insert_one(row)

client.close()