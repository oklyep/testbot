const Telebot = require('telebot');
const MessageSender = require('./messageSender.js');
const MessageListener = require('./messageListener.js');
const db = require('./database.js');

const bot = new Telebot('799854495:AAEJkEIUO3BPJUJMzDdKOVhPynkfhVDWHWw');
const sender = new MessageSender(bot);

async function main() {
    let statistic = (await db.Statistic.findOne({})) || (await db.Statistic.create({}));
    let listener = new MessageListener(bot, sender);

    bot.start();
    //sending = sender.startSending();
}

process.stdin.resume();

async function exitHandler(){
    bot.stop();
    //await sending;
    await new Promise((resolve) => sender.messageQueue.drain = resolve);
    console.log('[sender.info] sending stopped');
    process.exit();
}

process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);

main();


