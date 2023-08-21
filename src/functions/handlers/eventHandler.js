const fs = require("fs");


module.exports = (client) => {
    client.eventHandler = async() => {
        for (const folder of fs.readdirSync("./src/events")) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith(".js"));

            for (const file of eventFiles) {
                const event = require(`../../events/${folder}/${file}`);
                if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
};