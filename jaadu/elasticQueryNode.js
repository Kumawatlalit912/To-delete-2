const {Client}=require('@elastic/elasticsearch');

const client=new Client({node:'http://localhost:9200'});


//another way to connec to elasticsearch

// const elasticsearch = require('@elastic/elasticsearch');
// const client=new elasticsearch.Client({
//     host:'localhost:9200',
//     log:'trace'
// })
// const body={
//     query:{
//         .......
//     }
// }
// client.search({
//     index:.....,
//     type:...,
//     body:body,
// }).then((res)=>{})


//get data using elasticsearch

const run=async()=>{
    try{
        const result=await client.search({
            index:'ecom',
            body:{
                query:{
                    match_all:{}
                }
            }
        })
        console.log(result.hits.total);
    }catch(e){
        console.log(e);
    }

}
// run().catch(console.log);


//insert data in elastic and that too in bulk by creating new index



const insertBulk=async()=>{
    try{

        const some=await client.indices.create({
            index:'wcom'
        })
    }catch(e){
        console.log(e);
    }

const docs=[
    {
        description:'ai web design',
        price:'1$'
    },
    {
        description:'normal web design',
        price:'10$'
    }
]

const body=docs.flatMap(doc=>[{index:{_index:'my_index'}},doc])
await client.bulk({refresh:true,body});
}
// insertBulk().catch(console.log);

const totalHits=async()=>{
    try{
        console.time();
        const res=await client.search({
            index:'ecom',
            size:5,
            body:{
                query:{
                    bool:{
                    must:[
                        {range:{
                            StockCode:{
                                gte:84878,
                                lte:84880
                            }
                        }}
                    ]
                }
            }
            }
        })
        let store=[];
        console.log(res.hits.total);
        store=res.hits.hits;
        console.table(store);
        console.timeEnd();
    }catch(err){
        console.log(err);
    }
}
totalHits();