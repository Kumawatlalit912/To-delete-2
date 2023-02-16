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
              query: `{$name}`,
              analyzer: "standard",
              fuzziness: 2,
              prefix_length: 1,
            },
          },
        },
        sort: {
          doc_Score: {
            order: "desc",
          },
        },
      },
    });
    console.log(some.hits.hits);
    return some.hits.hits;
  } catch (e) {
    console.error("error while connecting to Elasticsearch", e.stack);
  }
};
const updateData = async (name, id) => {
  try {
    const some = await client.updateByQuery({
      index: "movies",
      body: {
        query: {
          term: {
            _id: id,
          },
        },
        script: {
          source: "ctx._source.data_Score =params.newDataScore",
          params: {
            newDataScore: "Math.log10(doc['data_score'].value+1)",
          },
        },
      },
    });
    return some.hits.hits;
  } catch (e) {
    console.log("some error occurred while updating", e);
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
app.post("/data/:name/:id", async (req, res) => {
  try {
    const somedata = await updateData(req.params.name, req.params.id);
    res.send(somedata);
  } catch (e) {
    res.send("some error occured while updating data");
  }
});
app.listen(3000, console.log("server is listening on port 3000"));
// someData("d");
