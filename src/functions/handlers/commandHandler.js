const { token } = require("../../config.json");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");


module.exports = (client) => {
    client.commandHandler = async() => {
        for (const folder of fs.readdirSync("./src/commands")) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '9' }).setToken(token);

        await rest.put( Routes.applicationCommands("1075903854941573170"), { body: client.commandArray })
    }
};