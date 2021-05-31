const express = require('express'); 
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const nunjucks = require('nunjucks');
const dotenv = require('dotenv'); 

dotenv.config(); 
const indexRouter = require('./routes'); 

const app = express(); 
app.set('port',process.env.PORT || 8005); 
app.set('view engine', 'html'); 
nunjucks.configure('views',{
    express:app,
    watch:true, 
}); 

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json());
app.use(express.urlencoded({extended:false,})); 
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET, 
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));

app.use('/',indexRouter); 

app.use((err,req,res,next)=>{
    
})