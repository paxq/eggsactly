const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const { required } = require('nodemon/lib/config');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */


  name: 'ban',
  description: 'Bans a user.',
  deleted: true, // Defaul command for this action already exists
  options: [
    {
      name: 'user',
      description: 'User to ban.',
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
        name: 'reason',
        description: 'Reason for the ban.',
        type: ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
  
  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('user').value;
    const targetUser = await interaction.guild.members.fetch(targetUserId);
    const reason = interaction.options.get('reason')?.value || 'No reason provided.';

    const targetUserRolePosition = targetUser.roles.hightest.position;
    
    await interaction.deferReply({ ephemeral: true });

    if(!targetUser) {
        await interaction.editReply({ content: 'That user doesn\'nt exist in this server.' });
        return;
    }
    if(targetUserId === interaction.guild.ownerId) {
        await interaction.editReply({ content: 'You can\'t ban that user because they are the server owner.' });
        return;
    }
  }
}