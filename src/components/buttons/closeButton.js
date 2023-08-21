const { EmbedBuilder } = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    data: {
        name: "closebutton",
    },
    async execute(interaction, client) {

        await client.users.fetch(interaction.user.id);
        await client.users.fetch(interaction.channel.topic);
        if (!await interaction.member.roles.cache.some(r => r.name === 'Seller')) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("You don't have enough permissions to do this.")
                .setTimestamp()
                .setColor(client.error);

            interaction.reply({ embeds: [ embed ] })
            return;
        }

        const log = await discordTranscripts.createTranscript(interaction.channel);

        const embed = new EmbedBuilder()
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
            embeds: [ embed ],
            files: [ log ]
        });



        interaction.channel.delete();
    }
}