const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://atuldev:Atul2005@cluster0.xemmccn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected Successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

test();