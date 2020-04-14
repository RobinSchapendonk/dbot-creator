module.exports.run = async (prefix, client, message, args) => {
	if (!message.member.permissions.has('MANAGE_ROLES')) {message.channel.send("You don't have permission to remove a role!");}
	const member = message.mentions.members.first();
	if (!member) return message.channel.send('You must mention an user!');
	if (!member.manageable) {
		return message.channel.send(
			"I don't have permission to remove a role to this user!",
		);
	}
	const role = message.guild.roles.cache.find(
		(x) => x.name === args.slice(1).join(' '),
	);
	if (!role) {
		return message.channel.send(
			"That's not a valid RoleName (so not a mention)",
		);
	}
	if (!role.editable) {
		return message.channel.send(
			"I don't have permission to remove a role to this user!",
		);
	}
	member.roles.remove(role.id);
	message.channel.send(`${member.user.tag} hasn't got the role ${role.name} anymore!`);
};
exports.help = {
	name: 'removerole',
	category: 'Moderation',
	description: 'Removes a role to a member.',
	usage: 'removerole <user> <roleName>',
};
