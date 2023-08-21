const { PermissionsBitField, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getRate, calcPrice } = require("../../utils/prices");

module.exports = {
    data: {
        name: 'paypalmodal',
    },
    async execute(interaction, client) {

        const channel = await interaction.guild.channels.create({
            name: `${interaction.fields.getTextInputValue("username")}-${interaction.fields.getTextInputValue("coins").replace("m", "")}m-paypal`,
            type: ChannelType.GuildText,
            parent: interaction.guild.channels.cache.find(r => r.name === 'Tickets')
        });

        await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false });
        await channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true });
        await channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(r => r.name === 'Seller'), { ViewChannel: true });

        await channel.setTopic(interaction.user.id);

        const embed = new EmbedBuilder()
            .setTitle("New Ticket Created")
            .setDescription(`Please, allow us some time to get back to you.\n\n**Username**\n\`${interaction.fields.getTextInputValue("username")}\`\n**Quantity**\n\`${interaction.fields.getTextInputValue("coins").replace("m", "")}m\`\n**Payment Method**\n\`PayPal\`\n**Your Rate**\n\`${getRate(interaction.fields.getTextInputValue("coins").replace("m", ""))}\`\n**Amount Due**\n\`${calcPrice(interaction.fields.getTextInputValue("coins").replace("m", ""))}$\`\n\nPlease, send a payment to \`loryy@duck.com\` **selecting Friends and Family as an option** (Mistakes will result in the order getting voided), then send proof of the payment here.`)
            .setTimestamp()
            .setColor(client.color)

        const closeButton = new ButtonBuilder()
            .setCustomId("closebutton")
            .setLabel("Close Ticket")
            .setStyle(ButtonStyle.Danger);

        const closeVouchButton = new ButtonBuilder()
            .setCustomId("closevouchbutton")
            .setLabel("Close Ticket ( + Vouch )")
            .setStyle(ButtonStyle.Danger);

        await channel.send({
            content: "@everyone",
            embeds: [ embed ],
            components: [ new ActionRowBuilder().addComponents(closeButton, closeVouchButton) ]
        })

        await interaction.deferUpdate();
    }
}