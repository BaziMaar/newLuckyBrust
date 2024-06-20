const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const DragonTigerEntryTransaction = mongoose.model('DragonTigerEntryTransaction', transactionSchema);

module.exports = DragonTigerEntryTransaction;
