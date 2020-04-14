module.exports.run = async (prefix, client, message, args) => {
	if (!message.member.permissions.has('MANAGE_MESSAGES')) {message.channel.send("You don't have permission to purge messages!");}
	if (
		!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES') ||
      !message.channel
      	.permissionsFor(message.guild.me)
      	.has('READ_MESSAGE_HISTORY')
	) {return message.channel.send("I don't have permission to purge messages!");}
	const deleteCount = parseInt(args[0], 10);
	if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
		return message.channel.send(
			'Please give a valid number! (min = 2, max = 100)',
		);
	}
	message.channel.bulkDelete(deleteCount);
};
exports.help = {
	name: 'purge',
	category: 'Moderation',
	description: 'Purge (clear) messages.',
	usage: 'purge <number>',
};
