const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "vouchbutton",
    },
    async execute(interaction, client) {

        const modal = new ModalBuilder().setTitle("Vouch Form").setCustomId("vouchmodal");

        const coinQuantity = new TextInputBuilder()
            .setCustomId("coins")
            .setLabel("Quantity")
            .setPlaceholder("3.2b")
            .setMinLength(2)
            .setMaxLength(6)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);
        
        const rating = new TextInputBuilder()
            .setCustomId("rating")
            .setLabel("Rating (1-10)")
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
            .setPlaceholder("10")
            .setStyle(TextInputStyle.Short);

        const review = new TextInputBuilder()
            .setCustomId("review")
            .setLabel("Review")
            .setRequired(true)
            .setPlaceholder("I really loved the service and the sellers (especially Lory).")
            .setStyle(TextInputStyle.Paragraph);

        modal.addComponents(new ActionRowBuilder().addComponents([ coinQuantity ]));
        modal.addComponents(new ActionRowBuilder().addComponents([ rating ]));
        modal.addComponents(new ActionRowBuilder().addComponents([ review ]));

        await interaction.showModal(modal);

    }
}