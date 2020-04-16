module.exports.run = async (prefix, client, message, args) => {
	if (!message.member.permissions.has('MANAGE_ROLES')) {message.channel.send("You don't have permission to unmute this user!");}
	const member = message.mentions.members.first();
	if (!member) return message.channel.send('You must mention an user!');
	if (member.permissions.has('ADMINISTRATOR')) {message.channel.send("This user is an administrator, I can't unmute him!");}
	if (!member.manageable) {return message.channel.send("I don't have permission to unmute this user!");}
	let role = undefined;
	if (message.guild.roles.cache.find((r1) => r1.name == 'mute') && !role) {
		role = message.guild.roles.cache.find((r2) => r2.name == 'mute');
	} else if (message.guild.roles.cache.find((r3) => r3.name == 'Mute') && !role) {
		role = message.guild.roles.cache.find((r4) => r4.name == 'Mute');
	} else if (message.guild.roles.cache.find((r5) => r5.name == 'muted') && !role) {
		role = message.guild.roles.cache.find((r6) => r6.name == 'muted');
	} else if (message.guild.roles.cache.find((r7) => r7.name == 'Muted') && !role) {
		role = message.guild.roles.cache.find((r8) => r8.name == 'Muted');
	}
	if (role) {
		await member.roles.remove(role.id).catch((err) => logcatch(err, message));
		message.channel.send(`${member.user.tag} is unmuted!`);
	} else {
		message.channel.send("I can't find a role named `mute` / `muted`!");
	}
};
exports.help = {
	name: 'unmute',
	category: 'Moderation',
	description: 'Unute a member.',
	usage: 'unmute <user>',
};