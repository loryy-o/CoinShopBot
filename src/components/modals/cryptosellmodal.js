const { PermissionsBitField, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getSellRate, calcSellPrice } = require("../../utils/prices");

module.exports = {
    data: {
        name: 'cryptosellmodal',
    },
    async execute(interaction, client) {

        if (interaction.fields.getTextInputValue("coins").replace("m", "") < 500) {
            const failEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("The minimum amount you can sell is 500m.")
                .setColor(client.error);

            return await interaction.reply({
                embeds: [ failEmbed ],
                ephemeral: true
            });
        }

        const channel = await interaction.guild.channels.create({
            name: `${interaction.fields.getTextInputValue("username")}-${interaction.fields.getTextInputValue("coins")}m-crypto`,
            type: ChannelType.GuildText,
            parent: interaction.guild.channels.cache.find(r => r.name === 'SELL TICKETS')
        });

        await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false });
        await channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true });
        await channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(r => r.name === 'Seller'), { ViewChannel: true });

        await channel.setTopic(interaction.user.id);

        const embed = new EmbedBuilder()
            .setTitle("New Sell Ticket Created")
            .setDescription(`Please, allow us some time to get back to you.\n\n**Username**\n\`${interaction.fields.getTextInputValue("username")}\`\n**Quantity**\n\`${interaction.fields.getTextInputValue("coins").replace("m", "")}m\`\n**Payment Method**\n\`Crypto\`\n**Your Rate**\n\`${getSellRate(interaction.fields.getTextInputValue("coins").replace("m", ""))}\`\n**Amount Due**\n\`${calcSellPrice(interaction.fields.getTextInputValue("coins").replace("m", ""))}$\``)
            .setTimestamp()
            .setColor(client.color);

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
        });

        await interaction.deferUpdate();
    }
}