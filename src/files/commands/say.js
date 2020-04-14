module.exports.run = async (prefix, client, message, args) => {
	if (!message.member.permissions.has('MANAGE_MESSAGES')) {message.channel.send("You don't have permission to let me say anything!");}
	if (!args.join(' ')) {
		return message.channel.send(
			`Incorrect usage, please type \`${prefix}help say\` for the usage!`,
		);
	}
	const sayMessage = args.join(' ');
	if (message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) {
		message.delete();
	}
	message.channel.send(sayMessage);
};
exports.help = {
	name: 'say',
	category: 'Moderation',
	description: 'Let the bot send a message in the chat.',
	usage: 'say <response>',
};
