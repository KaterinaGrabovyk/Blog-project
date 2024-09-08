import express from "express"
import bodyParser from "body-parser";
const port=3000;
const app=express();
let posts=[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
  });
app.get("/posts", (req, res) => {
  res.render("posts.ejs",{
    posts:posts
});
  });
app.get("/post", (req, res) => {
    res.render("make-post.ejs");
  });
  
app.get("/view/:id", (req, res) => {
 let obj = posts.filter(post => post.id === parseInt(req.params.id));
    res.render("view.ejs",{
      title:obj[0].title,
      text:obj[0].text,
    });
  });

app.get("/update/:id", (req, res) => {
    let obj = posts.filter(post => post.id === parseInt(req.params.id));
    res.render("update.ejs",{
      title:obj[0].title,
      text:obj[0].text,
      id:obj[0].id
    });
  });

  let id=0;
app.post("/post",(req,res)=>{
    let title=req.body.title;
    let text=req.body.text;   
    posts.unshift({
        id,
        title,
        text
    })
    id++;
    res.redirect('/posts');
})  

app.post("/update/:id",(req,res)=>{
  let i=req.params.id;
  posts[i].title=req.body.title;
  posts[i].text=req.body.text;
  res.redirect('/posts');
})
app.post("/delete/:id",(req,res)=>{
  posts = posts.filter(post => post.id !== parseInt(req.params.id));
  res.redirect('/posts');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });