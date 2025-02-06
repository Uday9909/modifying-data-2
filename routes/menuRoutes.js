const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// **GET all menu items**
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});

// **POST - Add a new menu item**
router.post('/', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const newItem = new MenuItem({ name, description, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating menu item' });
    }
});

// **PUT - Update an existing menu item**
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            { name, description, price },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu item' });
    }
});

// **DELETE - Remove a menu item**
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item' });
    }
});

module.exports = router;
