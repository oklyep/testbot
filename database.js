const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/affobot', {useNewUrlParser: true});

StatisticSchema = new mongoose.Schema({
    active_channels: {type: Number, default: 0},
    users: {type: Number, default: 0}
});

Statistic = mongoose.model('Statistic', StatisticSchema);

UserSchema = new mongoose.Schema({
    user_id: Number,
    incoming_balance: {type: Number, default: 0},
    work_balance: {type: Number, default: 0}
});

UserSchema.statics.newUser = async function newUser(user_id) {
    let user = await User.create({user_id: user_id});
    await Statistic.updateOne({}, {$inc: {users: 1}});
    return user;
};

User = mongoose.model('User', UserSchema);


MailingSchema = new mongoose.Schema({
    user_id: Number,
    text: String,
    completed: {type: Boolean, default: false}
});

// Mailing = mongoose.model('Mailing', MailingSchema);
//
// MailingQueueSchema = new mongoose.Schema({
//     mailing_id
//
//
// });

module.exports = {
    Statistic,
    User,
    Mailing
};
