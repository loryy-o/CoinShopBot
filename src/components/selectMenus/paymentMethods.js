const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "paymentmethods",
    },
    async execute(interaction, client) {

        const modal = new ModalBuilder().setTitle("Purchase Form");

        switch (interaction.values[0]) {
            case "paypal":
                modal.setCustomId("paypalmodal");
                break;
            case "card":
                modal.setCustomId("cardmodal");
                break;
            case "crypto":
                modal.setCustomId("cryptomodal");
                break;
        }

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