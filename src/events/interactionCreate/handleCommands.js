const { escapeHeading } = require('discord.js');
const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utilities/getLocalCommands');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!interaction.guild.id === testServer) {
        interaction.reply({
          content: 'This command cannot be ran here.',
          ephemeral: true
        });
        return;
      }
    }

    if(commandObject.rolesRequired?.length) {
      let roles = [];
      for(const role of commandObject.rolesRequired) {
        if(!interaction.member.roles.cache.get(role)) {
          roles.push(role);
        }
      }
      if(roles.length >= commandObject.rolesRequired.length) {
        let i = [];
        for (const role of roles) {
          i.push(` <@&${role}>`);
        }
        interaction.reply({
          content: `This command requires the role(s):${i}.`,
          ephemeral: true
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: `This command requires the permission: ${permission}.`,
            ephemeral: true
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: `I don't have the premission required to run this command: ${permission}.`,
            ephemeral: true
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}.`);
  }
};