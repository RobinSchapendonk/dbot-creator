module.exports.run = async (prefix, client, message, args) => {
	client.database.all(`SELECT * from economy WHERE user="${message.author.id}"`, async (err, datas) => {
		if(!datas[0]) {
			client.database.run('INSERT INTO economy (user, balance, lastwork) VALUES (?,?,?)', [message.author.id, '0', '1']);
		}
		let balance = datas[0] ? datas[0].balance : '0';
		let lastwork = datas[0] ? datas[0].balance : '1';
		if(lastwork) {
			if(new Date() - new Date(lastwork) < 300000) return message.channel.send('You can only work every 5 minutes!');
		}
		const random = Math.round(Math.random() * 100);
		lastwork = Date.now();
		balance = Math.round(parseInt(balance) + parseInt(random));
		client.database.run(`UPDATE economy SET balance=? WHERE user='${message.author.id}'`, balance);
		client.database.run(`UPDATE economy SET lastwork=? WHERE user='${message.author.id}'`, lastwork);
		message.channel.send(`You worked for ${random}`);
	});
};
exports.help = {
	name: 'work',
	category: 'Economy',
	description: 'Work for money.',
	usage: 'work',
};
