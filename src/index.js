require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

eventHandler(client);

// Test command
client.on('messageCreate', msg => {
  if (msg.author.bot) return;

  if(msg.content == "?id") {
    msg.reply(`Your ID is ${msg.author.id}!`);
  }
});

// REMOVE COMMANDS
// client.on('ready', () => {
//   client.application.commands.set([]);
//   console.log('begun deletetion, reload in 10 minutes to see effects')
// });

client.login(process.env.TOKEN);