const sleep = require('sleep-promise');

class MessageSender {
    constructor(bot) {
        this.bot = bot;
        this.replyQueue = [];
        this.mailQeeues = [];
    }

    reply(ctx, text) {
        this.replyQueue.push({ctx: ctx, text: text});
    }

    async startSending() {
        while (true) {
            let message;

            if (message = this.replyQueue.shift()) {
                await Promise.all([message.ctx.reply(message.text), sleep(50)]);
                continue;
            }

            await sleep(500);
        }
    }
}

module.exports = MessageSender;
//module.exports.default = MessageSender; а надо?
