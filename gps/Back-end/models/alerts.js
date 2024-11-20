const mongoose = require('mongoose');

const alertsSchema = new mongoose.Schema({
    imei: { type: String, required: true },
    alertName: { type: String, required: true },
    alertTime: { type: Date, required: true }
}, { minimize: false });

module.exports = mongoose.model('alerts', alertsSchema);