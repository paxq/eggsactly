const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'say',
  description: 'Say something.',
  options: [
    {
        name: 'message',
        description: 'Send a message.',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'content',
                description: 'What do you want to say?',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'user',
                description: 'Optional: DM a user.',
                type: ApplicationCommandOptionType.User
            }
        ]
    },
    {
        name: 'reply',
        description: 'Reply to a message.',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'content',
                description: 'What do you want to say?',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'reply',
                description: 'Message ID.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  
  callback: async (client, interaction) => {
    const command = interaction.options.getSubcommand();

    if (command === 'message') {
        const channelId = interaction.channelId;
        const content = interaction.options.get('content').value.replaceAll("\\n", "\n");
        const user = interaction.options.get('user')?.value;

        if (user) {
            await interaction.guild.members.cache.get(user).send(content);
        } else {
            await client.channels.cache.get(channelId).send(content);
        }
    }

    if (command === 'reply') {
        const channelId = interaction.channelId;
        const content = interaction.options.get('content').value.replaceAll("\\n", "\n");
        const reply = interaction.options.get('reply').value;
        await client.channels.cache.get(channelId).messages.fetch(reply).then((msg) => msg.reply(content));
    }
    
    await interaction.reply({ content: 'sent', ephemeral: true });
  }
}