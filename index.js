//server
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 3100;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server running");
});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@picsamaze.cninswl.mongodb.net/?retryWrites=true&w=majority&appName=PicsAmaze"`;

// Create a new client and connect to MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const picsAmazedb = client.db("picsAmazeDB");
    const picsCollection = picsAmazedb.collection("picsCollection");

    app.post("/pics", async(req,res) => {
      //data
      
      const picInfo=req.body;
      const result= await picsCollection.insertOne(picInfo);
      res.send(result); 
      console.log(`a document has been inserted, id: ${result.insertedId}`);
    });
    //
    
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
