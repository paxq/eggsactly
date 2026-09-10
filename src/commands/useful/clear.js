const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { required } = require('nodemon/lib/config');

module.exports = {
  name: 'clear',
  description: 'Clears a given number of messages from the channel.',
  options: [
    {
      name: 'amount',
      description: 'Number of messages to clear.',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'target',
      description: 'Delete only a certain users messages.',
      type: ApplicationCommandOptionType.User
    }
  ],
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.ManageMessages],
  
  callback: async (client, interaction) => {
    const channel = interaction.channel;
    const target = interaction.options.get('target')?.value;
    let amount = Number(interaction.options.get('amount').value);

    await interaction.deferReply({ ephemeral: true });

    if(!amount || amount < 1 || amount > 100) {
        return await interaction.editReply({ content: 'Please specify an amount between 1 and 100.', ephemeral: true  });
    }
    try {
        const channelMessages = await channel.messages.fetch();

        if(channelMessages.size === 0) {
            return await interaction.editReply({ content: 'There are no messages to delete in this channel.', ephemeral: true });
        }
        if(amount > channelMessages.size) amount = channelMessages.size;

        const clearEmbed = new EmbedBuilder().setColor('#000000');


        let messagesToDelete = [];

        if(target) {
            channelMessages.forEach((message) => {
                if(message.author.id === target && messagesToDelete.length < amount) {
                    messagesToDelete.push(message);
                }
            });

            clearEmbed.setDescription(`
                \`✅\` Successfully cleared \`${messagesToDelete.length}\` message(s) from <@${target}> in ${channel}.
                `)
        } else {
            messagesToDelete = channelMessages.first(amount);
            clearEmbed.setDescription(`
                \`✅\` Successfully cleared \`${messagesToDelete.length}\` message(s) in ${channel}.
                `)
        }
        if(messagesToDelete.length > 0) {
            await messagesToDelete.forEach((m) => {
                m.delete()
            });
        }

        await interaction.editReply({ embeds: [clearEmbed] })
    } catch (error) {
        await interaction.followUp({ content: 'An error occured while clearing.', ephemeral: true })
        console.log(error);
    }
  }
}