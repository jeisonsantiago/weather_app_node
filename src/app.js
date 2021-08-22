const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// public static directory
const publicDirectory = path.join(__dirname,'../public');

// template directory for handlebars (hbs)
const viewsPath = path.join(__dirname,'../templates/views');

const partialsPath = path.join(__dirname,'../templates/partials');

const app  = express();

// fallback in case process.env.PORT is undefined
const port = process.env.PORT || 3000

// set static server
app.use(express.static(publicDirectory));
// set template engine
app.set('view engine', 'hbs');
// tel express where to look for the views (hbs)
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('',(req, res)=>{
  res.render('index',{
    title:"Weather App",
    name:"Jeison Santiago"
  });
});

app.get('/about',(req, res)=>{
  res.render('about',{
    title:"About App",
    imageSrc:path.join('images','person.jpg')
  });
});

app.get('/help',(req, res)=>{
  res.render('help',{
    title:"Help App",
  });
});

app.get('/weather',(req, res)=>{
  const{address} = req.query;

  if(!address){
    res.send({
      error:"Address must be provided"
    });
  }

  geocode(address,(error, {latitude, longitude, location} = {})=>{
    if(error){
      return res.send({error:error});
    }

    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error});
      }

      res.send({
        forecastData,
        location,
        address
      });
    });
  });
});

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: '404',
    error_message:"Help article not found."
  });
});

// match anything (404) page not found
// and also has to be the last "app.get"
app.get('*',(req,res)=>{
  //res.send("404 error");
  res.render('404',{
    title: '404',
    error_message:"Page not found."
  });
});

// local port = 3000 / heroku port ?
app.listen(port,()=>{
  console.log('Server is up and running. port:'+port);
});