const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')))

app.use(cors());
app.use(bodyParser.json());
const posts = require('./routes/api/posts')

app.use("/api/posts",posts)
if(process.env.NODE_ENV !== 'production'){
   app.use(express.static(__dirname + '/public'));

   //handle SPA
   app.get(/.*/,(req,res) => res.sendFile(__dirname + './public/index.html'))
}
const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server started on port ${port}`));