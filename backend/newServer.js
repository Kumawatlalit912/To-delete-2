// const { Client } = require("@elastic/elasticsearch");
const elastic = require("elasticsearch");
const client = elastic.Client({ host: "http://localhost:9200" });
// const client = new Client({ node: "http://localhost:9200" });
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const someData = async (name) => {
  try {
    const some = await client.search({
      index: "movies",
      body: {
        query: {
          match: {
            Series_Title: {
              query: `${name}`,
              analyzer: "standard",
              prefix_length: 1,
            },
          },
        },
      },
    });
    return some.hits.hits;
  } catch (e) {
    console.error("error while connecting to Elasticsearch", e.stack);
  }
};

app.get("/", (req, res) => {
  res.send("hello there 😀");
});
app.get("/data/:name", async (req, res) => {
  try {
    const chunkData = await someData(req.params.name);
    res.send(chunkData);
  } catch (e) {
    res.send("hola amigo");
  }
});
app.listen(3000, console.log("server is listening on port 3000"));
// someData("d");
