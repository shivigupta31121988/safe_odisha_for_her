const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {
    createItem: async (itemData) => {
        const item = new Item(itemData);
        return await item.save();
    },
    getItems: async () => {
        return await Item.find();
    },
    getItemById: async (id) => {
        return await Item.findById(id);
    },
    updateItem: async (id, itemData) => {
        return await Item.findByIdAndUpdate(id, itemData, { new: true });
    },
    deleteItem: async (id) => {
        return await Item.findByIdAndDelete(id);
    }
};