module.exports.run = async (prefix, client, message, args) => {
	if (!message.member.permissions.has('BAN_MEMBERS')) {message.channel.send("You don't have permission to ban this user!");}
	const member = message.mentions.members.first();
	if (!member) return message.channel.send('You must mention an user!');
	if (member.permissions.has('ADMINISTRATOR')) {message.channel.send("This user is an administrator, I can't ban him!");}
	if (!member.bannable) {return message.channel.send("I don't have permission to ban this user!");}
	const reason = args.slice(1).join(' ') || 'No reason provided!';
	await member.ban(reason);
	message.channel.send(
		`${member.user.tag} has been banned because: ${reason}!`,
	);
};
exports.help = {
	name: 'ban',
	category: 'Moderation',
	description: 'Ban a member.',
	usage: 'ban <user> [reason]',
};
