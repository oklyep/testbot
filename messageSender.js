const async = require("async");

class MessageSender {
    constructor(bot) {
        this.bot = bot;

        this.messageQueue = async.queue(async (task, callback) => {
            await Promise.all([this.bot.sendMessage(task.user_id, task.text), new Promise((resolve) => setTimeout(resolve, 50))]);
            callback();
        });
    }

    reply(user_id, text) {
        this.messageQueue.push({user_id: user_id, text: text});
    }
}

module.exports = MessageSender;
