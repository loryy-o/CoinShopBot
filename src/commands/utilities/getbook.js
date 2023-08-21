const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { get } = require("axios");
const { whitelist } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("getbook")
            .setDescription("Finds a book for buyout.")
            .addBooleanOption(option =>
                option.setName("manipulated")
                    .setDescription("Exclude commonly manipulated books (i.e. Respite II & III)")
                    .setRequired(true)
            )
            .addIntegerOption(option =>
                option.setName("maxvol")
                    .setDescription("Maximum volume")
                    .setRequired(true)
            )
            .addStringOption(option =>
                option.setName("exclude")
                    .setDescription("Exclude specific words (i.e. respite, you can split the words with a space)")
                    .setRequired(false)
            ),

    async execute(interaction, client) {
        if (interaction.user.id != client.ownerid && !whitelist.includes(interaction.user.id) && interaction.user.id != 291452372050378752 && interaction.user.id != 1052147503530782722 && interaction.user.id != 178564696868257793) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("You don't have enough permissions to do this.")
                .setTimestamp()
                .setColor(client.error);

            await interaction.reply({
                embeds: [ embed ],
                ephemeral: true
            });

            return;
        }

        get("https://api.hypixel.net/skyblock/bazaar").then(async (response) => {
            let req = response.data.products;

            let lowest = { name: "None!", buyOrders: 999999999999999, priceForAll: 999999999999999 };

            for (const [product, value] of Object.entries(req)) {
                productStatus = req[product]["quick_status"];
                if (req[product]["product_id"].includes("ENCHANTMENT_") && productStatus["sellMovingWeek"] > 0 && productStatus["buyPrice"] >= 1 && productStatus["buyVolume"] < interaction.options.getInteger("maxvol")) {
                    if (interaction.options.getBoolean("manipulated") && req[product]["product_id"].includes("RESPITE")) { continue; }
                    if (interaction.options.getString("exclude")) {
                        const words = req[product]["product_id"].split(/[_]+/);
                        const excludes = interaction.options.getString("exclude").split(/[ -]+/);

                        for (const word of words) {
                            for (const exclude in excludes) {
                                if (word.toLowerCase() == exclude.toLowerCase()) {
                                    continue;
                                }
                            }
                        }
                    }
                    let buyoutCost = 0;
                    for (const order of req[product]["buy_summary"]) {
                        buyoutCost += order["amount"] * order["pricePerUnit"];
                    }

                    if (((productStatus["buyVolume"] <= lowest["buyOrders"] && buyoutCost < lowest["priceForAll"]) || buyoutCost < lowest["priceForAll"]) && productStatus["buyPrice"] >= 1 && productStatus["buyVolume"] < interaction.options.getInteger("maxvol")) {
                        lowest["name"] = req[product]["product_id"].replace("ENCHANTMENT_", "").replace(new RegExp("_", "g"), " ");
                        lowest["buyOrders"] = productStatus["buyVolume"];
                        lowest["priceForAll"] = buyoutCost.toFixed(2);
                    }
                }
            }

            const embed = new EmbedBuilder()
                .setTitle("Buyout")
                .setDescription(`Here's the item with the lowest buyout price.\n\n**Name:** \`${lowest.name}\`\n**Buyout Cost:** \`${lowest.priceForAll}\`\n**Volume:** \`${lowest.buyOrders}\``)
                .setColor(client.color)
                .setTimestamp();

            await interaction.reply({
                embeds: [ embed ],
                ephemeral: true
            })
        });
    }
}