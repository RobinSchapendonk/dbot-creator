module.exports.run = async (prefix, client, message, args) => {
	if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
		return message.channel.send(
			"I don't have permission to send embed messages!",
		);
	}
	if (!args[0]) {
		const moderationArr = [],
			informationArr = [];
		client.cmdhelp
			.filter((cmd) => cmd.category === 'Moderation')
			.forEach((cmd) => {
				moderationArr.push(cmd.name);
			});
		client.cmdhelp
			.filter((cmd) => cmd.category === 'Information')
			.forEach((cmd) => {
				informationArr.push(cmd.name);
			});
		const embed = new client.discord.MessageEmbed()
			.setThumbnail(member.user.avatarURL())
			.setColor('random')
			.addField('Moderation commands', moderationArr.join('\n'), true)
			.addField('Information commands', informationArr.join('\n'), true);
		message.channel.send(embed);
	} else {
		const cmd = client.cmdhelp.filter((cm) => cm.name === args[0]).first();
		if (!cmd) {
			return message.channel.send('No command found with that name!');
		}
		message.channel.send(
			`${cmd.name.charAt(0).toUpperCase()} ${cmd.name.substr(1)}\n\n${
				cmd.description
			}\nUsage:\`${cmd.usage}\``,
		);
	}
};

exports.help = {
	name: 'help',
	category: 'General',
	description: 'Displays all the commands, or specify a command for details.',
	usage: 'help [commandName]',
};
