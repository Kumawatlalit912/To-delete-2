// const { Client } = require("@elastic/elasticsearch");
const elastic = require("elasticsearch");
const client = elastic.Client({ host: "localhost:9200" });
// const client = new Client({ node: "http://localhost:9200" });
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const someData = async (name) => {
  try {
    const some = await client.search({
      index: "kibana_sample_data_ecommerce",
      body: {
        query: {
          regexp: {
            customer_first_name: {
              value: `${name}.*`,
              flags: "ALL",
              case_insensitive: true,
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
