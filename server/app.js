const express = require("express");
const helmet =  require("helmet")
const morgan = require("morgan")
const app = express();
const mongoose = require("mongoose")
const entry = require("./routes/entry");
const auth = require("./routes/auth")
const MONGO_URI = "mongodb+srv://Dan:5dKUuMvLqCRYL33R@cluster0.wiwcy.mongodb.net/diary_app?retryWrites=true&w=majority"

const port = 8080
// set up middleware 


// allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'));
//set up routes
app.use("/api/entry", entry);
app.use("/api/auth", auth)

// handle global errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    const data = error.data
    res.status(status).json({message, data});
})

// connect to db and start app
 mongoose.connect(MONGO_URI).then(result => {
    app.listen(port, () => {
          // start app
            console.log(`app started on ${port}`)
        })
    }).catch(err => console.log(err)) 


