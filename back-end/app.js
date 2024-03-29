const express = require('express');
const app = express();
const env = require('dotenv');
const path = require('path');
const cors = require('cors')
const connectDataBase = require('./config/connectDataBase');
env.config({path:path.join(__dirname,'config','config.env')});

const products = require('./routes/product');
const orders = require('./routes/order');

connectDataBase();

app.use(express.json());
app.use(cors());
app.use('/api/v1', products);
app.use('/api/v1', orders);

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,'/front-end/build')));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname1,'..','front-end','build','index.html'))
    });
}
else{
    app.get('/',(req,res) => {
        res.send('API is running sucessfully.!')
    });
};

app.listen(process.env.PORT,()=>{
    console.log(`server listerning to port ${process.env.PORT} in ${process.env.NODE_ENV}.!`)
})