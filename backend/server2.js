// import {MongoClient} from 'mongodb';

// const uri="mongodb+srv://elmos:elmos1234@cluster0.ajxyefd.mongodb.net/?retryWrites=true&w=majority";

// const connecDb=async()=>{
//     try{
//         const conn=await MongoClient.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
//             if(err) console.log(err);
//             const db=client.db('movies');
//             console.log(db);
//             const collection=db.collection('moviesData');
//             console.log(collection);
//             const result=collection.find({}).toArray();
//             console.log(result);
//         })
//         console.log(`connected successfully`);
//     }catch(e){
//         console.log("some error occurred while connecting",e.message);
//     }
// }
// connecDb();


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://chalja:chalja1234@cluster0.y31lcp0.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     console.log(err);
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   const somedata=collection.insertOne({name:"kumawat"});
//   if(somedata){
//     console.log("inserted successfully");
//   }
//   client.close();
// });

// const mongoose=require('mongoose');
// const {MongoClient}=require('mongodb');

// const connecDb=async()=>{
//     try{
//         const conn=new MongoClient.connect('mongodb+srv://chalja:chalja1234@cluster0.y31lcp0.mongodb.net/?retryWrites=true&w=majority',{
//             useUnifiedTopology:true,
//             useNewUrlParser:true
//         },(err,client)=>{
//             if(err) console.log(err);
//             const db=client.db('movies');
//             const coll=db.collection('chalja');

//             const some=coll.insertOne({name:"kumawat",age:21,hobby:"i love error"});
//             if(some){
//                 console.log('inserted successfully');
//             }
//         })
        
        
//     }catch(e){
//         console.log(e)
//     }
// }
// connecDb();
// const {MongoClient} = require('mongodb');
// const listDatabases = async(client)=>{
//     let databasesList=await client.db().admin().listDatabases();
//     console.log("Databases");
//     let someDatabases=[];
//     databasesList.databases.forEach(db=>someDatabases.push(`-${db.name}`));
    
//     let store=someDatabases.filter((e)=>e==='-movies')
//     console.log(store);

// }


// const mainFunc=async()=>{
//     const uri="mongodb+srv://elmos:elmos1234@cluster0.ajxyefd.mongodb.net/?retryWrites=true&w=majority";
//     const client=new MongoClient(uri);

//     try{
//         await client.connect();
//         await listDatabases(client);
//     }catch(e){
//         console.error(e);
//     }finally{
//         await client.close();
//     }

// }
// mainFunc().catch(console.error);


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://elmos:elmos1234@cluster0.ajxyefd.mongodb.net/?retryWrites=true&w=majority";

// const init=()=>{
//   try{
//     console.log('inside try')
//     const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
//   client.connect((err,result) => {
//     if(err) throw err;
//     const db = client.db("movies");
//     const collection = db.collection("moviesData");
//     collection.find({}).toArray(function(err, docs) {
//       console.log(docs);
//       client.close();
//     });
//   });
//   }catch(e){
//     console.log(e);
//   }
// }
// init();

const {MongoClient}=require('mongodb');

const uri="mongodb+srv://elmos:elmos1234@cluster0.ajxyefd.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(uri);
const someData=async()=>{
    try{
        const conn=await client.connect();
        console.log("connected successfully");
        const db=client.db('movies');
        const collection=db.collection('moviesData');
        const result=await collection.find({Series_Title:{$regex:'&b'}}).limit(10).toArray();
        console.log(result);
        client.close();

    }catch(e){
        console.log(e.message);
    }
}
someData();












