const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const http =require('http');
const porthttp = process.env.PORT_HTTP || 5000;
const hostname = require('./utils/localhost');
const autismRouter = require('./routes/autismpred');
const uploadRouter = require('./routes/upload');
const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use('/predict/autism', autismRouter);
app.use('/upload', uploadRouter);
app.use('/download', express.static('client-img'));

const httpServer = http.createServer(app);

httpServer.listen(porthttp, ()=> {
  console.log(`Server berjalan pada host ${hostname} dan port ${porthttp}`);
});