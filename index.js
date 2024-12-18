const express = require("express");
const app = express();
const methodOverride = require("method-override");

const multer = require("multer");

const port = 3000;

const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const path = require("path");
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "public/images")));

let storage = multer.diskStorage({
  destination: path.join(__dirname, "public/images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});
let upload = multer({ storage });

let posts = [
  {
    id: uuidv4(),
    userimg: "Saurabhimg.jpg",
    username: "saurabh",
    content: "I Love Coding",
    comments: [
      {
        ctname: "Rahul",
        ct: "This is a good habit",
      },
      {
        ctname: "mayank",
        ct: "hi saurabh, how are you",
      },
    ],
  },

  {
    id: uuidv4(),
    userimg: "manish.jpg",
    username: "manish",
    content: "I am a body builder",
    comments: [
      {
        ctname: "Rahul",
        ct: "This is a good habit",
      },
      {
        ctname: "mayank",
        ct: "hi saurabh, how are you",
      },
    ],
  },
  {
    id: uuidv4(),
    userimg: "rajnish.png",
    username: "rajnish",
    content: "I like simple living and high thinking",
    comments: [
      {
        ctname: "Rahul",
        ct: "This is a good habit",
      },
      {
        ctname: "mayank",
        ct: "hi saurabh, how are you",
      },
    ],
  },
  {
    id: uuidv4(),
    userimg: "anuj.jpg",
    username: "anuj",
    content: "I am a medical student",
    comments: [
      {
        ctname: "Rahul",
        ct: "This is a good habit",
      },
      {
        ctname: "mayank",
        ct: "hi saurabh, how are you",
      },
    ],
  },
];

// for getting a new post request or creatting a new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// to recoll updated homepage
app.post("/posts", upload.single("userimg"), (req, res) => {
  if (!req.file) {
    console.error("No file uploaded!");
    return res.status(400).send("File upload failed.");
  }

  let { username, content } = req.body;
  let userimg = `${req.file.filename}`;
  let id = uuidv4();
  let comments = [];
  posts.push({ id, userimg, username, content, comments });
  res.redirect("/posts");
});

//show in detailed
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("show.ejs", { post });
});

app.post("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let { ctname, ct } = req.body;

  if (post) {
    post.comments.push({ ctname, ct });
  }

  res.redirect(`/posts/${id}`);
});

// to update a post ...
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(newContent);
  res.redirect("/posts");
});

//edit post form
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// initial request --- for home page....>
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// for deleting a requist
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  console.log("contact");
  res.render("contact.ejs");
});

app.get('/', (req, res) => {
   res.render("index.ejs", {posts});
  
});

//port is listinning .... to check
app.listen(port, () => {
  console.log(`Port is listening ${port}`);
});
