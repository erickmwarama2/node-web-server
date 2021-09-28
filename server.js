const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err)=>{
    if(err)
      console.log("Unable to write to the log file");
  });
  //console.log(`${now}`);
  next();
});

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

app.use((req, res, next)=>{
  console.log(req.method);
  console.log(req.url);
  console.log(req.path);
  console.log(req.headers.accept);
  next();
});

app.get('/', (req, res)=>{
  //res.send('<div><h2>Hello Express ! </h2></div>');
  // res.send({
  //   name : "Erick",
  //   age : 29,
  //   likes : [
  //     "Biking",
  //     "Hiking",
  //     "Dancing"
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle : 'Welcome Page',
    //currentYear : (new Date().getFullYear()),
    welcomeMessage : 'Welcome to our shop. Feel free to purchase '
  });
});

app.get('/about', (req, res)=>{
  //res.send("About Page");
  res.render('about.hbs',{
    pageTitle : 'About Us Page',
    //currentYear : (new Date().getFullYear())
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage : "Unable to handle that request"
  });
});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{

});

hbs.registerHelper('getCurrentYear', ()=>{
  return "year "+(new Date().getFullYear());
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.listen(3000, ()=>{
  console.log("Server listening on port 3000")
});
