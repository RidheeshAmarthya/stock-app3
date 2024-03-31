const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;
const uri =
  "mongodb+srv://admin:u49uawL5V2TkR3Rj@cluster0.jni60vo.mongodb.net/Stonks?retryWrites=true&w=majority";

app.get("/api/portfolio", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("Stonks");
    const collection = database.collection("YourCollectionName"); // Replace 'YourCollectionName' with your actual collection name
    const stocks = await collection.find({}).toArray();
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from MongoDB");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
