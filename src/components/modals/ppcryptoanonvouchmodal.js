const { PermissionsBitField, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: {
        name: 'anonppcryptovouchmodal',
    },
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Vouch")
            .addFields([
                { name: "Amount", value: `${interaction.fields.getTextInputValue("coins")}` },
                { name: "Rating", value: `${interaction.fields.getTextInputValue("rating")}/10` },
                { name: "Review", value: `>>> ${interaction.fields.getTextInputValue("review")}` }
            ])
            .setFooter({ text: `Author: [ANONYMOUS]` })
            .setTimestamp()
            .setColor(client.color);

        await client.channels.cache.find(r => r.name === '💜┃crypto-vouches').send({ embeds: [ embed ] });

        const embedEdit = new EmbedBuilder()
            .setTitle("Thank you!")
            .setDescription("Thanks for leaving a review!")
            .setTimestamp()
            .setColor(client.color);

        await interaction.message.edit({
            embeds: [ embedEdit ],
            components: [ ]
        });

        await interaction.deferUpdate();
    }
}