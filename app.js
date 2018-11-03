const Telegraf = require('telegraf');
const MessageSender = require('./messageSender.js');
const MessageListener = require('./messageListener.js');
const db = require('./database.js');

async function main() {
    let statistic = (await db.Statistic.findOne({})) || (await db.Statistic.create({}));

    let telegraf = new Telegraf('799854495:AAEJkEIUO3BPJUJMzDdKOVhPynkfhVDWHWw'); // todo
    let sender = new MessageSender(telegraf);
    let listener = new MessageListener(telegraf, sender, statistic);

    telegraf.startPolling();
    sender.startSending();
}

main();


