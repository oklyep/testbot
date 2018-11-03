const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/affobot', {useNewUrlParser: true});


module.exports.User = mongoose.model('User', new mongoose.Schema({
    user_id: Number,
    incoming_balance: {type: Number, default: 0},
    work_balance: {type: Number, default: 0}
}));

module.exports.Statistic = mongoose.model('Statistic', new mongoose.Schema({
    active_channels: {type: Number, default: 0},
    users: {type: Number, default: 0}
}));

