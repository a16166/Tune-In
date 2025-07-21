const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with latency info."),
    async execute(interaction) {
        const sent = await interaction.reply({ content: '🏓 Pinging...', withResponse: true });
        interaction.editReply(`latency is ${sent.resource.message.createdTimestamp - interaction.createdTimestamp}ms`);
    },
};