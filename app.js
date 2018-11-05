const Telegraf = require('telegraf');
const MessageSender = require('./messageSender.js');
const MessageListener = require('./messageListener.js');
const db = require('./database.js');

const telegraf = new Telegraf('799854495:AAEJkEIUO3BPJUJMzDdKOVhPynkfhVDWHWw'); // todo
const sender = new MessageSender(telegraf);

let sending;

async function main() {
    let statistic = (await db.Statistic.findOne({})) || (await db.Statistic.create({}));
    let listener = new MessageListener(telegraf, sender, statistic);

    telegraf.startPolling();
    sending = sender.startSending();
}

process.stdin.resume();

async function exitHandler(){
    telegraf.stop();
    console.log('polling stopped');
    sender.exit = true;
    await sending;
    console.log('bot stopped successfully');
    process.exit();
}

process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);

main();


