const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "ppcryptobutton",
    },
    async execute(interaction, client) {

        const modal = new ModalBuilder().setTitle("Purchase Form").setCustomId("ppcryptomodal");

        const coinQuantity = new TextInputBuilder()
            .setCustomId("quantity")
            .setLabel("Quantity (In USD)")
            .setPlaceholder("100")
            .setMinLength(2)
            .setMaxLength(4)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);
        
        const username = new TextInputBuilder()
            .setCustomId("crypto")
            .setLabel("Wanted Crypto")
            .setPlaceholder("BTC")
            .setMinLength(3)
            .setMaxLength(4)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        modal.addComponents(new ActionRowBuilder().addComponents([ coinQuantity ]));
        modal.addComponents(new ActionRowBuilder().addComponents([ username ]));

        await interaction.showModal(modal);

    }
}