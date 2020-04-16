module.exports.run = async (prefix, client, message, args) => {
	client.database.all(`SELECT * from economy WHERE user="${message.author.id}"`, async (err, datas) => {
		const balance = datas[0] ? datas[0].balance : '0';
		message.channel.send(`Your balance is: ${balance}`);
	});
};
exports.help = {
	name: 'balance',
	category: 'Economy',
	description: 'Check your balance.',
	usage: 'balance',
};
