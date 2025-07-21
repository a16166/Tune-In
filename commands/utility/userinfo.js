const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Provides information about a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('user whose information to fetch.')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);

        const username = user.globalName;
        const at = user.username;
        const joinTime = member.joinedAt;

        await interaction.reply(`${username} (@${at}), joined the server at ${joinTime}`);
    },
};