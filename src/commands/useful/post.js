const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'post',
  description: 'Posts an embed.',
  options: [
    {
      name: 'title',
      description: 'Title of the embed.',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'content',
      description: 'The post\'s content.',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'field',
      description: 'Optional field for extra information. e.g.(FIELD_NAME,FIELD_VALUE)',
      type: ApplicationCommandOptionType.String
    },
    {
      name: 'footer',
      description: 'Includes footer banner.',
      type: ApplicationCommandOptionType.Boolean
    },
    {
      name: 'channel',
      description: 'Channel to post message in. Defaults to current channel.',
      type: ApplicationCommandOptionType.Channel
    }
  ],
  rolesRequired: ['1312459125883666522', '1312459003120451645', '1312456364789858455'],
  
  callback: async (client, interaction) => {
    const title = interaction.options.get('title').value;
    const content = interaction.options.get('content').value.replaceAll('\\n','\n');
    const channel = (interaction.options.get('channel')?.value) ? client.channels.cache.get(interaction.options.get('channel').value) : interaction.channel;
    const fieldArray = interaction.options.get('field')?.value.split(',');
    const thumbnail = interaction.options.get('thumbnail')?.value;
    const banner = interaction.options.get('footer')?.value;

    let message = { embeds: [], files: [] };

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(content)

    if(fieldArray) {
        const field = {
            name: fieldArray[0],
            value: fieldArray[1]
        }
        embed.addFields(field);
    }

    if(banner) {
      const file = new AttachmentBuilder('images/banners/base_empty.png');
      embed.setImage('attachment://base_empty.png');
      message.files.push(file);
    }

    message.embeds.push(embed);

    await interaction.reply({ content: `Posted to ${channel}!`, ephemeral: true });
    await channel.send(message);
  }
}