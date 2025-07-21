const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bomdia")
        .setDescription(`says "bom dia!"`),
    async execute(interaction) {
        interaction.reply({ content: `Bom dia, ${interaction.user.username}!`, flags: MessageFlags.Ephemeral });
    },
};