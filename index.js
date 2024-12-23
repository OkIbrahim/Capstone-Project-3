import express from "express"; 
import bodyParser from "body-parser"; 
import { dirname } from "path"; 
import { fileURLToPath } from "url";
import { name } from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4120;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true}));

function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveSports") {
        userIsAuthorised = true;
    }
    next();
  }
  
  app.use(passwordCheck);

app.use(express.static("public"));
app.get("/", (req, res) => { 
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
if (userIsAuthorised) {
    res.render("index2.ejs");
} else {
    res.render("index.ejs");
}
});

app.listen(port, () => { 
    console.log(`Server running on port ${port}.`);
});