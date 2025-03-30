const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');



router.post('/', async(req, res)=> {
  try {
    const data = req.body; // Assuming the request body contains the menuItem data

    // Create a new menu document using Mongoose model
    const newMenuItem = new MenuItem(data);

    // save the new person to the database

    const response = await newMenuItem.save();
    console.log('Menu Item saved');
    res.status(200).json(response);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server error'});
  }
})

router.get('/', async (req, res) => {
  try{
    const data = await MenuItem.find();
    console.log('data fatched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// router.get('/', async (req, res) => {
//   try {
//     // Retriveve all menu items from the database
//     const menuItems = await MenuItem.find();

//     // Check if there are any menu items found
//     if(menuItems.length > 0) {
//       res.status(200).json(menuItems);
//     } else {
//       res.status(400).json({message: 'No menu items found'});
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({error: 'Internal server Error'});
//   }
// });


router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Extract the work type from the URL parameter
    if(tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet') {
      const response = await MenuItem.find({taste: tasteType});
      console.log('response fatched');
      res.status(200).json(response);
    } else {
      res.status(400).json({error: 'Invalid work type'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.put('/:id', async(req, res) => {
  try {
    const menuItemId = req.params.id; // Extract the id from the URL parameter
    const updateMenuData = req.body; // updated data for the Menu

    const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    })

    if(!response) {
      return res.status(404).json({error: 'MenuItem not found'});
    }

    console.log('MenuItem updated');
    res.status(200).json(response);
  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


router.delete('/:id', async(req, res) => {
  try{
    const menuItemId = req.params.id;
    //Assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndDelete(menuItemId);

    if(!response) {
      return res.status(404).json({error: 'MenuItem not found'});
    }
    
    console.log('MenuItem deleted');
    res.status(200).json({message: 'MenuItem deleted'});

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;