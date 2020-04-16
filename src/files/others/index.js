const discord = require('discord.js');
const fs = require('fs');
const sqlite3 = require('sqlite3');

const config = require('./settings.json');
const database = new sqlite3.Database('database.db');

const client = new discord.Client({ disableMentions: 'all' });
client.commands = new discord.Collection();
client.cmdhelp = new discord.Collection();
client.config = config;
client.discord = discord;
client.database = database;
client.login(config.token);

client.loadCommands = () => {
	fs.readdir('./commands/', (err, files) => {
		if (err) console.error(err);
		const jsFiles = files.filter((f) => f.split('.').pop() === 'js');
		console.log(`Loading a total of ${jsFiles.length} commands.`);
		jsFiles.forEach((f, i) => {
			delete require.cache[require.resolve(`./commands/${f}`)];
			const props = require(`./commands/${f}`);
			console.log('Loading command: ' + f);
			client.commands.set(f, props);
			client.cmdhelp.set(props.help.name, props.help);
		});
		console.log(`${client.user.username} is online in ${client.guilds.cache.size} servers with ${client.users.cache.size} users!`);
	});
};

client.on('ready', () => {
	client.loadCommands();
	client.user.setActivity(config.status, { type: 'LISTENING' });
	database.serialize(function() {
		database.run('CREATE TABLE if not exists economy (user TEXT, balance TEXT, lastwork TEXT)');
	});
});

client.on('message', (message) => {
	if (!message.content.startsWith(config.prefix)) return;

	const args = message.content
		.slice(config.prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd = client.commands.get(command + '.js');
	if (cmd) {
		cmd.run(config.prefix, client, message, args);
	}
});
