const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log("Coin Bot ready.");

        client.user.setPresence({
            activities: [{ name: 'For Buyers', type: ActivityType.Watching }],
            status: "online"
        });
    }
};