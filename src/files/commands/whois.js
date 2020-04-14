module.exports.run = async (prefix, client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send('You must mention an user!');
	if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
		return message.channel.send(
			"I don't have permission to send embed messages!",
		);
	}
	const joined = new Intl.DateTimeFormat('en-US').format(member.joinedAt);
	const roles =
      member.roles.cache
      	.filter((r) => r.id !== message.guild.id)
      	.map((r) => r)
      	.join(', ') || 'none';
	const created = new Intl.DateTimeFormat('en-US').format(member.user.createdAt);
	const embed = new client.discord.MessageEmbed()
		.setThumbnail(member.user.avatarURL())
		.setColor('random')
		.addField(
			'Member information:',
			`**Display name:** ${member.displayName}\n**Joined at:** ${joined}\n **Roles:** ${roles}`,
			true,
		)
		.addField(
			'User information:',
			`**ID:** ${member.user.id}\n**Username**: ${member.user.username}\n**Tag**: ${member.user.tag}\n**Created at**: ${created}`,
			true,
		);
	if (member.user.presence.game) {
		embed.addField(
			'Currently playing',
			`**Name:** ${member.user.presence.game.name}`,
		);
	}
	message.channel.send(embed);
};
exports.help = {
	name: 'whois',
	category: 'Information',
	description: 'Get info about a member.',
	usage: 'whois <user>',
};
