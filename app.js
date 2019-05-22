//jshint esversion:6

// requirements
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// constants
const homeStartingContent = "Welcome to HmongCoders.org. I established this website to bring together Hmong coders, developers, engineers, and students together.  ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Arraylist to hold blogs.
let blogList = [];

// initialize requirements.
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Base home route.
app.get("/", function(req, res){
  res.render("home",{
    HOMECONTENT: homeStartingContent,
    BLOGLIST: blogList
  });
});

// About page route. 
app.get("/about", function(req,res){
  res.render("about",{ABOUTCONTENT: aboutContent});
});

// Contact page route.
app.get("/contact", function(req,res){
  res.render("contact",{CONTACTCONTENT: contactContent});
});

// Compose new blog route. Hidden from user and accessed through url. Renders the compose page when called.
app.get("/compose", function(req,res){
  res.render("compose");
});

// Logic to save blog title and body into an array when I create a new blog in compose page.
app.post("/compose", function(request,response){
  
  const post={
    title: request.body.newBlogTitle, 
    content: request.body.newBlogContent 
  };
  blogList.push(post);
  response.redirect("/");

});

// redirects to post if post is a match in blog list. 
app.get("/posts/:postName", function(req,res)
{
  const resTitle = _.lowerCase(req.params.postName); 

  blogList.forEach(function(post)
  {
    const storedTitle = _.lowerCase(post.title);
    if(resTitle === storedTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

// Port location for local debugging.
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
