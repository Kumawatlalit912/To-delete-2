const mongoose=require('mongoose');
const express=require('express');
const app=express();
app.use(express.json());
const connectDb=async()=>{
    try{
        const conn=await mongoose.connect('mongodb+srv://elmos:elmos1234@cluster0.ajxyefd.mongodb.net/?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log(`connected successfully to mongodb :${conn.connection.host}`);
    }catch(e){
        console.log("some error occured while connecting",e.stack);
    }
}
connectDb();


