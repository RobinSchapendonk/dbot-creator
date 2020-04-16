module.exports.run = async (prefix, client, message, args) => {
	if (client.config.owner !== message.author.id) return;
	try {
		const code = args.join(' ');
		let evaled = eval(code);
		if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
		message.channel.send(clean(evaled), { code: 'xl' });
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
};
exports.help = {
	name: 'eval',
	category: 'Owner',
	description: 'Eval a text.',
	usage: 'eval <what>',
};

function clean(text) {
	if (typeof text === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
}