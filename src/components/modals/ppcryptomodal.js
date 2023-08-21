const { PermissionsBitField, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getRate, calcPrice } = require("../../utils/prices");

module.exports = {
    data: {
        name: 'ppcryptomodal',
    },
    async execute(interaction, client) {

        const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}-${interaction.fields.getTextInputValue("quantity")}-${interaction.fields.getTextInputValue("crypto")}`,
            type: ChannelType.GuildText,
            parent: interaction.guild.channels.cache.find(r => r.name === 'Crypto Tickets')
        });

        await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false });
        await channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true });
        await channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(r => r.name === 'Seller'), { ViewChannel: true });

        await channel.setTopic(interaction.user.id);

        const embed = new EmbedBuilder()
            .setTitle("New Ticket Created")
            .setDescription(`Please, allow us some time to get back to you.\n\n**Quantity needed**\n\`${interaction.fields.getTextInputValue("quantity")}\`\n**Wanted crypto**\n\`${interaction.fields.getTextInputValue("crypto")}\`\n**Payment Method**\n\`PayPal\`\n**You will receive**\n\`\$${interaction.fields.getTextInputValue("quantity") - ((10 / 100) * interaction.fields.getTextInputValue("quantity"))}\`\n\nPlease, send a payment of \`${interaction.fields.getTextInputValue("quantity")} USD\` to \`loryy@duck.com\` **selecting Friends and Family as an option** (Mistakes will result in the order getting voided), then send proof of the payment here.`)
            .setTimestamp()
            .setColor(client.color)

        const closeButton = new ButtonBuilder()
            .setCustomId("closebutton")
            .setLabel("Close Ticket")
            .setStyle(ButtonStyle.Danger);

        const closeVouchButton = new ButtonBuilder()
            .setCustomId("closevouchbuttonppcrypto")
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