const Transfer = require('../models/Transfer');
const mongoose = require('mongoose');


//Fetch all the Transfers
const getTransfers = async (req, res) => {
    const transfers = await Transfer.find({}).sort({createdAt: -1})
    res.status(200).json(transfers)
};

//Fetch a particular Transfer

const getTransfer = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such transfer found!'})
    }

    return res.status(200).json(await Transfer.findById(id));
}

