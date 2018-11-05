const db = require('./database');

class MessageListener {
    constructor(bot, messageSender) {
        this.messageSender = messageSender;
        this.bot = bot;

        this.createHandlers();
    }

    static validate(ctx) {
        return !(ctx.from.is_bot);
    }

    createHandlers() {
        bot.on(/^\/startmail (.+)$/, async (msg, props) => {
            const text = props.match[1];


            (await db.User.find({})).forEach(user => {

            })

        });


        this.bot.on(/.+/i, async (msg) => {
            //тут проверка на флуд, проверка кореектности команд и тд
            if (!MessageListener.validate(msg))
                return;

            const user_id = msg.from.id;
            const user = (await db.User.findOne({user_id: user_id})) || (await db.User.newUser(user_id));

            this.messageSender.reply(user_id, 'reply')
        });
    }
}

module.exports = MessageListener;
