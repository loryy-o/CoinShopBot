const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "paypalsellbutton",
    },
    async execute(interaction, client) {

        const modal = new ModalBuilder().setTitle("Sale Form").setCustomId("paypalsellmodal");

        const coinQuantity = new TextInputBuilder()
            .setCustomId("coins")
            .setLabel("Quantity (In millions)")
            .setPlaceholder("500")
            .setMinLength(3)
            .setMaxLength(4)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);
        
        const username = new TextInputBuilder()
            .setCustomId("username")
            .setLabel("Minecraft Username")
            .setMinLength(3)
            .setMaxLength(16)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        modal.addComponents(new ActionRowBuilder().addComponents([ coinQuantity ]));
        modal.addComponents(new ActionRowBuilder().addComponents([ username ]));

        await interaction.showModal(modal);

    }
}