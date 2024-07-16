// app.js
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
// Define Schema
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  favoriteFoods: { type: [String] }
});

// Create Model
const Person = mongoose.model('Person', personSchema);
// Example operations

// 1. Create and Save a Record
const newPerson = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Sushi']
  });
  
  newPerson.save((err, data) => {
    if (err) return console.error(err);
    console.log('New person saved:', data);
  });
  
  // 2. Create Many Records with Model.create()
  const arrayOfPeople = [
    { name: 'Mary', age: 25, favoriteFoods: ['Burger', 'Salad'] },
    { name: 'Bob', age: 40, favoriteFoods: ['Steak', 'Pasta'] }
  ];
  
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log('People created:', people);
  });
  
  // 3. Use Model.find() to Search Your Database
  Person.find({ name: 'Mary' }, (err, people) => {
    if (err) return console.error(err);
    console.log('People found by name:', people);
  });
  
  // 4. Use Model.findOne() to Return a Single Matching Document
  Person.findOne({ favoriteFoods: 'Pizza' }, (err, person) => {
    if (err) return console.error(err);
    console.log('Person found by favorite food:', person);
  });
  
  // 5. Use Model.findById() to Search Your Database By _id
  const personId = '5fbd8712abbd1a3d70123456'; // Replace with a valid _id from your database
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log('Person found by id:', person);
  });
  
  // 6. Perform Classic Updates by Running Find, Edit, then Save
  const personIdToUpdate = '5fbd8712abbd1a3d70123456'; // Replace with a valid _id
  Person.findById(personIdToUpdate, (err, person) => {
    if (err) return console.error(err);
    
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Person updated with new favorite food:', updatedPerson);
    });
  });
  
  // 7. Perform New Updates on a Document Using model.findOneAndUpdate()
  const personNameToUpdate = 'Mary';
  Person.findOneAndUpdate({ name: personNameToUpdate }, { age: 20 }, { new: true }, (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log('Person updated with new age:', updatedPerson);
  });
  
  // 8. Delete One Document Using model.findByIdAndRemove
  const personIdToDelete = '5fbd8712abbd1a3d70123456'; // Replace with a valid _id
  Person.findByIdAndRemove(personIdToDelete, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Person removed:', removedPerson);
  });
  
  // 9. Delete Many Documents with Model.remove()
  const nameToDelete = 'Mary';
  Person.remove({ name: nameToDelete }, (err, result) => {
    if (err) return console.error(err);
    console.log(`Removed ${result.deletedCount} people named ${nameToDelete}`);
  });
  
  // 10. Chain Search Query Helpers to Narrow Search Results
  Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, people) => {
      if (err) return console.error(err);
      console.log('People who like burritos:', people);
    });
  