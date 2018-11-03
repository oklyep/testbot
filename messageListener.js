const db = require('./database');

class MessageListener {
    constructor(telegraf, messageSender, statistic) {
        this.messageSender = messageSender;
        this.telegraf = telegraf;
        this.userCache = {};
        this.statistic = statistic;

        this.createHandlers();
    }

    async newUser(user_id) {
        let user = db.User({
            user_id: user_id,
            incoming_balance: 0,
            work_balance: 0
        });
        await user.save();

        this.statistic.users++;
        await this.statistic.save();

        return user;
    }

    static validate(ctx) {
        return !(ctx.updateType !== 'message' || ctx.message.from.is_bot);
    }

    createHandlers() {
        this.telegraf.hears(/.+/i, async (ctx) => {
            // тут проверка на флуд, проверка кореектности команд и тд
            if (!MessageListener.validate(ctx))
                return;

            let user_id = ctx.message.from.id;

            let user = this.userCache[user_id];

            if (!user) {
                user = (await db.User.findOne({usr_id: user_id})) || (await this.newUser(user_id));
                this.userCache[user_id] = user;
            }

            this.messageSender.reply(ctx, 'reply')
        });
    }
}

module.exports = MessageListener;