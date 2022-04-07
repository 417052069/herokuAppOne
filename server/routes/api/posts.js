const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get Posts

router.get("/toDoLists",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists");
  res.send(await posts.find({}).toArray()); //"projectName": '云南文山',"projectName": '海南儋州'
})

router.get("/overview",async (req,res) => {
  const posts = await loadPostsCollection("overview");
  res.send(await posts.find({}).toArray()); //"projectName": '云南文山',"projectName": '海南儋州'
})

//Add post 
router.post("/",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists");
  // console.log(req.body)
  await posts.insertOne({
    projectName: req.body.projectName,    
    createdAt: new Date()
  })
  res.status(201).send();
})

//Delete post
router.delete("/:id",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists");
  // console.log(req.body)
  await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send();
})

async function loadPostsCollection(name){
  const client = await mongodb.MongoClient.connect(`mongodb+srv://zshining1986:KFMsa05OGImUrXel@cluster0.qjihz.mongodb.net/Vue?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
  });
  return client.db("Vue").collection(name)
}

module.exports = router;