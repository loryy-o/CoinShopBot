const { token, ownerid, ticketcategory, vouchchannelid } = require("./config.json");

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds })

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

client.commandArray = [];

client.color = 0xa58fbe;
client.error = 0xff0000;

client.ownerid = ownerid;
client.ticketcategory = ticketcategory;
client.vouchchannelid = vouchchannelid;

 
for (const folder of fs.readdirSync("./src/functions")) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

console.log("Loading Handlers...")

client.eventHandler();
client.commandHandler();
client.componentHandler();

client.login(token);