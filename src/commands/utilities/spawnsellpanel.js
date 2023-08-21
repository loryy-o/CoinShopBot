const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("spawnsellpanel")
            .setDescription("spawns a sell panel."),

    async execute(interaction, client) {

        if (interaction.user.id != client.ownerid) {
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

        const embed = new EmbedBuilder()
            .setTitle("Open a sell ticket")
            .setDescription("Select your preferred payment method and fill out a simple form.\n\n**Our Rates**\n```\n500-999m  | 0.05 USD/m\n1b+ | 0.055 USD/m\n```\n\n**Payment Methods**\n```\n+ Paypal\n+ Crypto\n```")
            .setColor(client.color);

        const paypalButton = new ButtonBuilder()
            .setCustomId("paypalsellbutton")
            .setLabel("PayPal")
            .setStyle(ButtonStyle.Primary);

        const cryptoButton = new ButtonBuilder()
            .setCustomId("cryptosellbutton")
            .setLabel("Crypto")
            .setStyle(ButtonStyle.Danger);

        await interaction.channel.send({
            embeds: [ embed ],
            components: [ new ActionRowBuilder().addComponents(paypalButton, cryptoButton) ]
        })

        await interaction.deferReply();
    }
}