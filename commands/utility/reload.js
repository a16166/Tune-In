const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads a command.")
        .addStringOption(option => 
            option.setName("command").setDescription("the command to reload.").setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString("command"); //parses StringOption
        const command = interaction.client.commands.get(commandName);

        if(!command) {
            return await interaction.reply({ content: `There is no command with the name ${commandName}`, flags: MessageFlags.Ephemeral });
        }

        delete require.cache[require.resolve(`./${command.data.name}.js`)];
        try {
            const newCommand = require(`./${commandName}`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`)

        } catch (error) {
            console.error(error);
            await interaction.reply( {content: `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``, flags: MessageFlags.Ephemeral } )
        }
    }
}