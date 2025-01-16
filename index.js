import express from "express"; 
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const post = posts[req.params.id];
    if (post) {
        res.render('post', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Blog app running on port ${port}`);
});