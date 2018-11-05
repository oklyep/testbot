class MessageSender {
    constructor(bot) {
        this.bot = bot;
        this.replyQueue = [];
        this.mailQeeues = [];

        this.exit = false;
    }

    reply(ctx, text) {
        this.replyQueue.push({ctx: ctx, text: text});
    }

    async startSending() {
        while (!this.exit || this.replyQueue.length > 0) {
            let message;

            if (message = this.replyQueue.shift()) {
                await Promise.all([message.ctx.reply(message.text), new Promise((resolve) => setTimeout(resolve, 50, []))]);
                continue;
            }

            await new Promise((resolve) => setTimeout(resolve, 300, []));
        }
    }
}

module.exports = MessageSender;
//module.exports.default = MessageSender; а надо?
