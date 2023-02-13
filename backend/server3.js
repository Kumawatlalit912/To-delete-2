const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello there !!!!");
});

/*
get netflix/_search
{
  "query":{
    "bool":{
      "filter":{
        "script": {
          "script":{"source":"doc['release_year'].value>params.param1",
          "params": {
            "param1":2020
          }
          }
          
        }
      }
    }
  }
}

*/

const someData = async (title) => {
  try {
    const some = await client.search({
      index: "ecom",
      body: {
        query: {
          regexp: {
            Series_title: "^" + title + ".*",
          },
        },
      },
    });
    console.log(some.hits.hits);
    return some.hits.hits;
  } catch (e) {
    console.log(e);
  }
};
// app.post("/data", async (req, res) => {
//   try {
//     const somedata = await someData();
//     res.send(somedata);
//   } catch (e) {
//     res.send("No data received");
//   }
// });
app.get("/data/:title", async (req, res) => {
  const some = await someData(req.params.title);
  console.log(some);
  res.send(some);
});

app.listen(3001, console.log("connected successfully"));
