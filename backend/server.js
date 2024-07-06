const express = require('express')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const {MongoClient} = require('mongodb')
const cors = require('cors')
// console.log(process.env.MONGO_URI ) // remove this after you've confirmed it is working
dotenv.config()

// connection url 
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url) ;

// datebase name 
const dbname = 'passwordData'
const app = express()
app.use(bodyparser.json())
app.use(cors())
const port = 4000 
client.connect(); 

// get all passwords data
app.get('/', async(req, res) => {
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    const findresult = await collection.find({}).toArray();
  res.json(findresult)
})
// save all passwords
app.post('/', async(req, res) => {
    const password = req.body

    const db = client.db(dbname)
    const collection = db.collection('passwords')
    const findresult = await collection.insertOne(password);
  res.send({success:true});
})

// hare is delete passwords data 

app.delete('/',async(req,res)=>{
const password =req.body
const db = client.db(dbname)
const collection = db.collection('passwords');
const findresult = await collection.deleteOne(password);
res.send({success:true, result:findresult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})