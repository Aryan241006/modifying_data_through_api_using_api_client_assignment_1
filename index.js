require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./menuItem');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Error connecting to database", err));

app.post('/menu', async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    const menuItem = new MenuItem({ name, description, price });
    await menuItem.save();
    res.status(201).json({ message: "Menu item created successfully", data: menuItem });
  } catch (error) {
    console.error("Error creating menu item:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: error.message });
    }
    
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error retrieving menu items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
