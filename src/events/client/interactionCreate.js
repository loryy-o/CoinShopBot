const { InteractionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const command = commands.get(interaction.commandName);
            if (!command) return;
            

            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.error(err);

                const embed = new EmbedBuilder()
                .setTitle("Error!")
                .setDescription(`\`\`\`\n${err}\n\`\`\``)
                .setTimestamp()
                .setColor(client.error)
                .setFooter({ text: "Report this to my creator!" });

                await interaction.reply({
                    embeds: [ embed ],
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);

            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.error(err);

                const embed = new EmbedBuilder()
                .setTitle("Error!")
                .setDescription(`\`\`\`\n${err}\n\`\`\``)
                .setTimestamp()
                .setColor(client.error)
                .setFooter({ text: "Report this to my creator!" });

                await interaction.reply({
                    embeds: [ embed ],
                    ephemeral: true
                });
            }
        } else if (interaction.isStringSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.customId);

            try {
                await selectMenu.execute(interaction, client);
            } catch (err) {
                console.error(err);

                const embed = new EmbedBuilder()
                .setTitle("Error!")
                .setDescription(`\`\`\`\n${err}\n\`\`\``)
                .setTimestamp()
                .setColor(client.error)
                .setFooter({ text: "Report this to my creator!" });

                await interaction.reply({
                    embeds: [ embed ],
                    ephemeral: true
                });
            }
        } else if (interaction.type == InteractionType.ModalSubmit) {
            const modal = client.modals.get(interaction.customId);

            try {
                await modal.execute(interaction, client);
            } catch (err) {
                console.error(err);

                const embed = new EmbedBuilder()
                .setTitle("Error!")
                .setDescription(`\`\`\`\n${err}\n\`\`\``)
                .setTimestamp()
                .setColor(client.error)
                .setFooter({ text: "Report this to my creator!" });

                await interaction.reply({
                    embeds: [ embed ],
                    ephemeral: true
                });
            }
        }
    }
};