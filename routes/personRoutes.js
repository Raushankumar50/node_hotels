const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// PORT route to add a person
router.post('/', async (req, res)=> {
  
  try {
    const data = req.body // Assuming the request body contains the person data

    // Create a new Person document using Mongoose model
    const newPerson = new Person(data);


    // Save the new person to the database

    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server error'});
  }

  // newPerson.save((error, savePerson) => {
  //   if(error) {
  //     console.log('Error saving person:', error);
  //     res.status(500).json({error: 'Internal server error'})
  //   } else {
  //     console.log('data saved successfully');
  //     res.status(200).json(savePerson);
  //   }
  // })

  // newPerson.name = data.name;
  // newPerson.age = data.age;
  // newPerson.mobile = data.mobile;
  // newPerson.email = data.email;
  // newPerson.address = data.address;
});

// app.post('/person', async (req, res) => {
//   try {
//     const data = req.body;

//     // Create a new Person document using Mongoose model
//     const newPerson = new Person(data);

//     // Save the new person to the database
//     const response = await newPerson.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err); // This will log the full error to the console
//     res.status(500).json({ error: 'Internal Server error', details: err.message });
//   }
// });


// GET route to add a person
router.get('/', async (req, res) => {
  try {
    const person = await Person.find();

    if(person.length > 0) {
      res.status(200).json(person);
    } else {
      res.status(400).json({message: 'No Person Here'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.get('/:workType', async(req, res)=> {
  try{
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(400).json({error: 'Invalid work type'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})


router.put('/:id', async (req, res) => {
  try{
    const personId = req.params.id; // Extract the id from the  URL  parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    })

    if(!response) {
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})


router.delete('/:id', async(req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the  URL  parameter
    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);

    if(!response) {
      return res.status(404).json({ error: 'Person not found'});
    }
    console.log('data delete');
    res.status(200).json({message: 'person Deleted Successfully'});
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error'});
  }
})

module.exports = router;