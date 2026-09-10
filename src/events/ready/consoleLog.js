const { ActivityType } = require('discord.js');

const status = [
  {
    name: 'Ice Cream Sandwich',
    type: ActivityType.Watching,
    url: 'https://youtu.be/jzdd8A-iHSo?si=7aNpAUmaBGbKhSsD'
  },
  {
    name: 'The Office',
    type: ActivityType.Watching
  },
  {
    name: '?id',
    type: ActivityType.Playing
  },
  {
    name: 'Supersonic Acrobatic Rocket-Powered Battle Cars',
    type: ActivityType.Playing
  },
  {
    name: 'Quack ASMR',
    type: ActivityType.Listening
  },
  {
    name: 'Chuckle Sandwich',
    type: ActivityType.Listening
  },
  {
    name: 'I\'M A GOOFY GOOBER ROCK',
    type: ActivityType.Listening,
  },
  {
    name: 'Trackmania',
    type: ActivityType.Competing
  },
  {
    name: 'Purplers Door Contest',
    type: ActivityType.Competing
  },
  {
    name: 'Attempting to hack into CIA headquarters',
    type: ActivityType.Custom
  },
  {
    name: 'If you\'re reading this... I didn\'t think that far.',
    type: ActivityType.Custom,
  },
  {
    name: 'im probalab diselxics',
    type: ActivityType.Custom,
  },
  {
    name: 'discord.gg/YOURFAVOURITESERVERHERE',
    type: ActivityType.Custom,
  },
  {
    name: 'As a true gamer once said, "Never reveal all your tactics in a youtube video. You fool."',
    type: ActivityType.Custom,
  },
  {
    name: 'Use #beans4life in suggestions for a 10% discount! — nobody ever',
    type: ActivityType.Custom,
  },
  {
    name: 'r/minecrafthmmmm',
    type: ActivityType.Custom,
  },
  {
    name: 'R U O K',
    type: ActivityType.Custom,
  },
  {
    name: 'a palindrome is a word that is spelled the same way forward and backward',
    type: ActivityType.Custom,
  },
  {
    name: 'aibohphobia is the irrational fear of palindromes',
    type: ActivityType.Custom,
  },
  {
    name: 'emordnilapphobia is the fear of flipped palindromes',
    type: ActivityType.Custom,
  },
]

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(status[Math.floor(Math.random() * status.length)]);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[random]);
  }, 120000);
};