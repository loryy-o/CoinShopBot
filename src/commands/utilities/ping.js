const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Returns the ping to Discord's servers."),

    async execute(interaction, client) {

        const embed = new EmbedBuilder()
            .setTitle("Pong!")
            .setDescription(`My latency is \`${client.ws.ping}ms\`!`)
            .setColor(client.color)
            .setTimestamp();

        await interaction.reply({
            embeds: [ embed ],
            ephemeral: true
        })
    }
}