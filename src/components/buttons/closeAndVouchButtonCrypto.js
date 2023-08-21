const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    data: {
        name: "closevouchbuttonppcrypto",
    },
    async execute(interaction, client) {

        await client.users.fetch(interaction.user.id);
        if (!await interaction.member.roles.cache.some(r => r.name === 'Seller')) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("You don't have enough permissions to do this.")
                .setTimestamp()
                .setColor(client.error);

            interaction.reply({ embeds: [ embed ] })
            return;
        }

        const userid = interaction.channel.topic;

        const embed = new EmbedBuilder()
            .setTitle("Thank you!")
            .setDescription("Hey there, thanks for using our service!\nWe'd love if you took a few seconds to vouch us.\nYou can either do it anonymously or show your Discord name.")
            .setTimestamp()
            .setColor(client.color);

        const vouchButton = new ButtonBuilder()
            .setCustomId("vouchbuttonppcrypto")
            .setLabel("Vouch")
            .setStyle(ButtonStyle.Success);

        const anonVouchButton = new ButtonBuilder()
            .setCustomId("anonvouchbuttonppcrypto")
            .setLabel("Vouch Anonymously")
            .setStyle(ButtonStyle.Primary);

        client.users.send(userid, {
            embeds: [ embed ],
            components: [ new ActionRowBuilder().addComponents(vouchButton, anonVouchButton) ]
        })

        const log = await discordTranscripts.createTranscript(interaction.channel);

        const logEmbed = new EmbedBuilder()
            .setTitle("Ticket closed")
            .addFields([
                { name: "Channel name", value: `${interaction.channel.name}` },
                { name: "User", value: `<@${client.guilds.cache.get("1075677050888798249").members.cache.get(interaction.channel.topic).id}>` },
                { name: "UserID", value: `\`${interaction.channel.topic}\`` }
            ])
            .setFooter({ text: `Author: ${interaction.user.id}` })
            .setTimestamp()
            .setColor(client.color);

        await client.channels.cache.find(r => r.name === '🧾┃ticket-logs').send({
            embeds: [ logEmbed ],
            files: [ log ]
        });

        interaction.channel.delete();
    }
}