const { readdirSync } = require("fs");

module.exports = (client) => {
    client.componentHandler = async () => {
        for (const folder of readdirSync("./src/components")) {
            const components = readdirSync(`./src/components/${folder}`).filter(file => file.endsWith(".js"));

            switch (folder) {
                case "buttons":
                    for (const file of components) {
                        const button = require(`../../components/${folder}/${file}`);
                        client.buttons.set(button.data.name, button);
                    }
                    break;
                
                case "selectMenus":
                    for (const file of components) {
                        const menu = require(`../../components/${folder}/${file}`);
                        client.selectMenus.set(menu.data.name, menu);
                    }
                    break;

                case "modals":
                    for (const file of components) {
                        const modal = require(`../../components/${folder}/${file}`);
                        client.modals.set(modal.data.name, modal);
                    }
                    break;
                    break;
                
                default:
                    break;
            }
        }
    }
}