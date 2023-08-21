const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("spawnpanel")
            .setDescription("spawns a panel."),

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
            .setTitle("Open a ticket")
            .setDescription("Select your preferred payment method and fill out a simple form.\n\n**Our Rates**\n```\n100-499m  | 0.09 USD/m\n500-1999m | 0.085 USD/m\n2b+       | 0.08 USD/m\n```\n\n**Payment Methods**\n```\n+ Paypal\n+ Crypto\n+ Credit Card / Debit Card [DISABLED]\n```\n\n**The minimum SA to buy coins here is 17-20 depending on the amount.**")
            .setColor(client.color);

        const paypalButton = new ButtonBuilder()
            .setCustomId("paypalbutton")
            .setLabel("PayPal")
            .setStyle(ButtonStyle.Primary);

        const cardButton = new ButtonBuilder()
            .setCustomId("cardbutton")
            .setLabel("Card")
            .setStyle(ButtonStyle.Success);

        const cryptoButton = new ButtonBuilder()
            .setCustomId("cryptobutton")
            .setLabel("Crypto")
            .setStyle(ButtonStyle.Danger);

        await interaction.channel.send({
            embeds: [ embed ],
            components: [ new ActionRowBuilder().addComponents(paypalButton, cryptoButton) ]
        })

        await interaction.deferReply();
    }
}