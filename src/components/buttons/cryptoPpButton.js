const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "cryptoppbutton",
    },
    async execute(interaction, client) {

        const embed = new EmbedBuilder()
            .setTitle("Coming Soon!")
            .setDescription("We do not currently support this option. If you need to exchange Crypto to PayPal, you can use the other button in the meantime.")
            .setColor(client.error)
            .setTimestamp();

        await interaction.reply({
            embeds: [ embed ],
            ephemeral: true
        })
    }
}