const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "cardbutton",
    },
    async execute(interaction, client) {

        const modal = new ModalBuilder().setTitle("Purchase Form").setCustomId("cardmodal");

        const coinQuantity = new TextInputBuilder()
            .setCustomId("coins")
            .setLabel("Quantity (In millions)")
            .setValue("100")
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