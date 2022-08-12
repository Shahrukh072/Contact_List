const express = require('express');
const path = require('path');
const port = 8080;

const db = require('./config/mongoose')
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views') );
 app.use(express.urlencoded());
app.use(express.static('assets'));


//  //middleware1
//  app.use(function(req, res, next){
//   console.log( req.myName);
//    req.myName = "Shahrukh";

//   // console.log('middleware 1 called');
//   next();
//  });

//  //middleware 2
//  app.use(function(req, res, next){
//    console.log('My Name from MW2', req.myName);

//   // console.log('middle ware 2 called');
//   next();
//  });


 var contactList = [
  {
    name: "Shahrukh",
    phone: "111111111"
  },
  {
    name: "Tony Stark",
    phone: "1234567890"
  },
  {
    name: "coding Ninjas",
    phone: "2333333333"
  }
 ]

 
app.get('/', function(req, res){

  Contact.find({}, function(err, contacts){
   if(err){
    console.log('Error in featching contacts from db')
    return;
   }

   return res.render('home', {
    title: "My Contact List",
   contacts_list: contacts

  });
  
  
});
  
});


app.get('/practice', function(req, res){
  return res.render('practice', {
    title: "Let us play with ejs"
  });

});

app.post('/create-contact', function(req, res){
  // return res.redirect('/practice');
  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.phone);

  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone
  // });

   //contactList.push(req.body);

   Contact.create({
    name: req.body.name,
    phone: req.body.phone
   }, function(err, newContact){
    if(err){console.log('error in creating a contact!');
     return;}

     console.log('*************', newContact);
     return res.redirect('back');
   });

  // return res.redirect('back');

});

//for deleting contact
app.get('/delete-contact', function(req, res){
  // console.log(req.params)

  //get the id from the  query url
 let id = req.query.id;
// find the contact in the database using id
Contact.findByIdAndDelete(id, function(err){
  if(err){
    console.log('error in deleting an object from database');
    return;
  }
  return res.redirect('back');

}); 

// let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//  if(contactIndex != 1){
//   contactList.splice(contactIndex, 1);
//  }


});


app.listen(port, function(err){
 if(err){
    console.log('Error in running the server', err);
 } 
 console.log('yup!My Express server is running on port:',port)

});