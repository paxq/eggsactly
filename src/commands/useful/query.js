module.exports = {
  name: 'query',
  description: '[Insert template here]',

  callback: (client, interaction) => {
    interaction.reply({content: "This is a Template.", ephemeral:true});
  }
} 