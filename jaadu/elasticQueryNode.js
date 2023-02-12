const {Client}=require('@elastic/elasticsearch');

const client=new Client({node:'http://localhost:9200'});


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
        console.log(result.hits.hits);
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
insertBulk().catch(console.log);
