const { PermissionsBitField, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: {
        name: 'vouchmodal',
    },
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Vouch")
            .addFields([
                { name: "Quantity", value: `${interaction.fields.getTextInputValue("coins")}` },
                { name: "Rating", value: `${interaction.fields.getTextInputValue("rating")}/10` },
                { name: "Review", value: `>>> ${interaction.fields.getTextInputValue("review")}` }
            ])
            .setFooter({ text: `Author: ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
            .setColor(client.color);

        await client.channels.cache.find(r => r.name === '💜┃vouches').send({ embeds: [ embed ] })

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