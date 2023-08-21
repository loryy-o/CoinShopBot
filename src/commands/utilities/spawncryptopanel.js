const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("spawncryptopanel")
            .setDescription("spawns a Crypto Exchange panel."),

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
            .setTitle("Open a crypto ticket")
            .setDescription("We currently accept PayPal, and we exchange to BTC, LTC, ETH and XMR. (We also exchange Crypto to PayPal!)\n\n**Our tax:** `7.5%`\n\n**The minimum exchange is $10**")
            .setColor(client.color);

        const ppToCryptoBtn = new ButtonBuilder()
            .setCustomId("ppcryptobutton")
            .setLabel("PP -> Crypto")
            .setStyle(ButtonStyle.Primary);

        const cryptoToPpButton = new ButtonBuilder()
            .setCustomId("cryptoppbutton")
            .setLabel("Crypto -> PP")
            .setStyle(ButtonStyle.Success);

        await interaction.channel.send({
            embeds: [ embed ],
            components: [ new ActionRowBuilder().addComponents(ppToCryptoBtn, cryptoToPpButton) ]
        })

        await interaction.deferReply();
    }
}