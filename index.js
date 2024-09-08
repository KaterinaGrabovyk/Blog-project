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
 let obj = posts.filter(post => post.id === parseFloat(req.params.id));
 console.log("now viewing object")
 console.log(obj)
    res.render("view.ejs",{
      title:obj[0].title,
      text:obj[0].text
    });
  });

app.get("/update/:id", (req, res) => {
    let obj = posts.filter(post => post.id === parseFloat(req.params.id));
    console.log("now updating object")
    console.log(obj)
    res.render("update.ejs",{
      title:obj[0].title,
      text:obj[0].text,
      id:obj[0].id
    });
  });


app.post("/post",(req,res)=>{
  let id=Math.random()*1000;
    let title=req.body.title;
    let text=req.body.text;   
    posts.unshift({
        id,
        title,
        text
    })
    console.log("added new object")
    console.log(posts[0])
    res.redirect('/posts');
})  

app.post("/update/:id",(req,res)=>{
  let i=parseFloat(req.params.id);
  posts.forEach(post => {
    if(post.id===i){
     post.title=req.body.title;
     post.text=req.body.text;
     console.log("updated object")
     console.log(post)
    }
  });

  res.redirect('/posts');
})

app.post("/delete/:id",(req,res)=>{
  posts.forEach(post => {
    if(post.id===parseFloat(req.params.id)){
      console.log("deleted object")
      console.log(post)
    }
  })
  posts = posts.filter(post => post.id !== parseFloat(req.params.id));

  res.redirect('/posts');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });