const express=require('express');
const app=express();
const axios=require('axios');
app.use(express.json());

const someData=async()=>{
    try{
        const data=await axios.get('http://localhost:9200/ecom/_search').then((res)=>{
            return res.data;
        })
        console.log(data);
        return data;
    }catch(e){
        console.log(e.message);
    }
}



app.get('/',(req,res)=>{
    res.send("hello there 👋");
})
app.get('/data',async(req,res)=>{
    const data=await someData();
    res.send(data);
})

app.listen(3000,console.log('listening on port 3000'));