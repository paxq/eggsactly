module.exports = (client, guildMember) => {
    console.log(`Gave ${guildMember.user.username} the "@Community Member" role.`);
    guildMember.roles.add(guildMember.guild.roles.cache.get('1312461030588416071'));
};