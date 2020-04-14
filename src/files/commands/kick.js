module.exports.run = async (prefix, client, message, args) => {
	if (!message.member.permissions.has('KICK_MEMBERS')) {message.channel.send("You don't have permission to kick this user!");}
	const member = message.mentions.members.first();
	if (!member) return message.channel.send('You must mention an user!');
	if (member.permissions.has('ADMINISTRATOR')) {message.channel.send("This user is an administrator, I can't kick him!");}
	if (!member.kickable) {return message.channel.send("I don't have permission to kick this user!");}
	const reason = args.slice(1).join(' ') || 'No reason provided!';
	await member.kick(reason);
	message.channel.send(
		`${member.user.tag} has been kicked because: ${reason}!`,
	);
};
exports.help = {
	name: 'kick',
	category: 'Moderation',
	description: 'Kick a member.',
	usage: 'kick <user> [reason]',
};
