const fs=require('fs');
const MongoClient=require('mongodb').MongoClient;
const csv=require('csv-parser');
const data=require('./imdb_top_1000.csv');
const url='mongodb+srv://elmos:elmos1234@cluster0.ajxyefd.mongodb.net/?retryWrites=true&w=majority';

const writeData=async()=>{
    const client=await MongoClient.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});

    const db=client.db('movies');
    const collection=db.collection('moviesData');

    try{
        fs.createReadStream(data).pipe(csv()).on('data',async(data)=>{
            let documents={};
            for(const key in data){
                if(data.hasOwnProperty(key)){
                    document[key]=data[key];
                }
            }
            await collection.inserOne(documents,(err,res)=>{
            console.log("inserted data into the collection");

            });
        }).on('end',async()=>{
            console.log('csv file was successfully processed');
            await client.close();
        })
    }catch(e){
        console.log(e);
    }
}
writeData();
