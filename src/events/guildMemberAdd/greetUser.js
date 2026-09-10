module.exports = (client, guildMember) => {
    console.log(`${guildMember.user.username} joined the server. They are member number ${guildMember.guild.memberCount}.`);
    client.channels.cache.get('1312298836676317194').send(`👋 **Welcome to the server <@${guildMember.id}>!** You are member #${guildMember.guild.memberCount}.`);
};