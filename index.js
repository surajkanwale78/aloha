
// import file dependencies //

var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require ("mongoose")


// new create express js aap //
const app = express()


// dependencies in express.js //

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({

    extended:true

}))

// connection to database //

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
 useUnifiedTopology: true
});

// to get connection in mongodb database //
var db = mongoose.connection;

db.on('error',()=>console.log(" error ind database connection"));
db.once('open',()=>console.log("connected to database"));

 
app.post("/sign_up",(req,res)=>
{
    // the user data is retrived //
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var address = req.body.address;
    

    // all data store in single object data object //

    var data =
    {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password,
        "address": address
        
    }

    // to insert collection & document //
    db.collection('users').insertOne(data,(err,collection)=>
    {
        if(err)
        {
            throw err;
        }
        console.log("record inserted succesfully");
    });

    return res.redirect('signup_success.html')


})


// login page start here //


app.post("/log_in", function (req,res)
{
    var email = req.body.email;
    var password = req.body.password;

    var data =
    {
        "email": email,
        "password": password 
    }

    user.log_in(new user ({username : username }),password,function(err,user)
    {
        if(err)
        {
            console.log(err);
        }
       
       return res.redirect('index.html')
    });
}) 
 


// allow to localhost access  &  port number //

app.get("/",(req,res)=>{
    res.send({
        "Allow-access-allow-origin": '*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("listening on PORT 3000");

