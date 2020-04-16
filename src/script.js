function onLoad() {
	document.getElementById('bots').innerHTML = '';
	const electron = require('electron');
	const defaultPath = (electron.app || electron.remote.app).getPath('userData');
	const path = defaultPath + '/bots/';
	const fs = require('fs');
	fs.readdir(path, (err, files) => {
		files.forEach((file) => {
			document.getElementById('bots').innerHTML += `<button onclick="checkBot('${file}')">${file}</button>`;
		});
		setInterval(() => {
			if(!document.getElementById('error').innerHTML) {
				error(' ');
			};
		}, 1000);
	});
	const { ipcRenderer } = require('electron');
	ipcRenderer.send('event', 'main');
}

function createNew() {
	error(' ');
	const name = document.getElementById('name').value;
	const token = document.getElementById('token').value;
	const prefix = document.getElementById('prefix').value;
	const status = document.getElementById('status').value;
	const owner = document.getElementById('owner').value;
	// eslint-disable-next-line quotes
	if(token.includes('"') || prefix.includes('"') || name.includes('/')) return error(`The character " and \ aren't allowed!`);
 	if(!name || !token || !prefix || !status || !owner) return error('Make sure to fill in every field!');
	const electron = require('electron');
	const defaultPath = (electron.app || electron.remote.app).getPath('userData');
	const path = defaultPath + '/bots/' + name;
	const fs = require('fs');
	if (fs.existsSync(path)) {
		return error(`You already have a bot named ${name}!`);
	}
	if (!fs.existsSync(defaultPath + '/bots')) {
		fs.mkdirSync(defaultPath + '/bots');
	}
	fs.mkdirSync(path);
	document.getElementById('main').style = 'display: none';
	document.getElementById('new').style = '';
	fs.writeFileSync(`${path}/settings.json`, `{"token":"${token}","prefix":"${prefix}","status":"${status}","owner":"${owner}"}`, { encoding:'utf8', flag:'w' });
	const { ipcRenderer } = require('electron');
	ipcRenderer.send('event', 'new');
}

function updateBot() {
	error(' ');
	const oldName = document.getElementById('curBot').innerHTML;
	const name = document.getElementById('name2').value;
	const token = document.getElementById('token2').value;
	const prefix = document.getElementById('prefix2').value;
	const status = document.getElementById('status2').value;
	const owner = document.getElementById('owner2').value;
	// eslint-disable-next-line quotes
	if(token.includes('"') || prefix.includes('"') || name.includes('/')) return error(`The character " and \ aren't allowed!`);
	if(!name || !token || !prefix || !status || !owner) return error('Make sure to fill in every field!');
	const electron = require('electron');
	const defaultPath = (electron.app || electron.remote.app).getPath('userData');
	const oldPath = defaultPath + '/bots/' + oldName;
	const path = defaultPath + '/bots/' + name;
	if(path !== oldPath) {
		const fs = require('fs');
		fs.renameSync(oldPath, path);
		checkBot(name);
	}
	fs.writeFileSync(`${path}/settings.json`, `{"token":"${token}","prefix":"${prefix}","status":"${status}","owner":"${owner}"}`, { encoding:'utf8', flag:'w' });
	const { ipcRenderer } = require('electron');
	ipcRenderer.send('event', 'update');
}

function saveCommands() {
	error(' ');
	const name = document.getElementById('name').value;
	if(!name) {
		document.getElementById('main').style = '';
		document.getElementById('new').style = 'display: none;';
	}
	const electron = require('electron');
	const defaultPath = (electron.app || electron.remote.app).getPath('userData');
	const path = defaultPath + '/bots/' + name;
	const fs = require('fs');
	if (!fs.existsSync(path)) {
		return error('It seems like something went wrong, please try again!');
	}
	// Moderation
	const kick = document.getElementById('kick').checked;
	const ban = document.getElementById('ban').checked;
	const warn = document.getElementById('warn').checked;
	const purge = document.getElementById('purge').checked;
	const say = document.getElementById('say').checked;
	const mute = document.getElementById('mute').checked;
	const unmute = document.getElementById('unmute').checked;

	// Roles
	const addrole = document.getElementById('addrole').checked;
	const removerole = document.getElementById('removerole').checked;

	// Information
	const whois = document.getElementById('whois').checked;

	// Economy
	const balance = document.getElementById('balance').checked;
	const work = document.getElementById('work').checked;

	// Owner
	const eval = document.getElementById('eval').checked;
	if (!fs.existsSync(path + '/commands')) {
		fs.mkdirSync(path + '/commands');
	}
	if(kick) {
		saveFile(`${path}/commands/kick.js`, './src/files/commands/kick.js');
	}
	if(ban) {
		saveFile(`${path}/commands/ban.js`, './src/files/commands/ban.js');
	}
	if(warn) {
		saveFile(`${path}/commands/warn.js`, './src/files/commands/warn.js');
	}
	if(purge) {
		saveFile(`${path}/commands/purge.js`, './src/files/commands/purge.js');
	}
	if(say) {
		saveFile(`${path}/commands/say.js`, './src/files/commands/say.js');
	}
	if(mute) {
		saveFile(`${path}/commands/mute.js`, './src/files/commands/mute.js');
	}
	if(unmute) {
		saveFile(`${path}/commands/unmute.js`, './src/files/commands/unmute.js');
	}

	if(addrole) {
		saveFile(`${path}/commands/addrole.js`, './src/files/commands/addrole.js');
	}
	if(removerole) {
		saveFile(`${path}/commands/removerole.js`, './src/files/commands/removerole.js');
	}

	if(whois) {
		saveFile(`${path}/commands/whois.js`, './src/files/commands/whois.js');
	}

	if(balance) {
		saveFile(`${path}/commands/balance.js`, './src/files/commands/balance.js');
	}
	if(work) {
		saveFile(`${path}/commands/work.js`, './src/files/commands/work.js');
	}

	if(eval) {
		saveFile(`${path}/commands/eval.js`, './src/files/commands/eval.js');
	}
	saveFile(`${path}/index.js`, './src/files/others/index.js');
	saveFile(`${path}/package.json`, './src/files/others/package.json');
	saveFile(`${path}/commands/help.js`, './src/files/commands/help.js');
	['kick', 'ban', 'warn', 'purge', 'say', 'mute', 'unmute', 'addrole', 'removerole', 'whois', 'balance', 'work', 'eval'].forEach((command) => {
		document.getElementById(command).checked = false;
	});
	document.getElementById('main').style = '';
	document.getElementById('new').style = 'display: none';
	onLoad();
	const { ipcRenderer } = require('electron');
	ipcRenderer.send('event', 'made');
}

function checkBot(name) {
	error(' ');
	const electron = require('electron');
	const defaultPath = (electron.app || electron.remote.app).getPath('userData');
	const path = defaultPath + '/bots/' + name;
	const fs = require('fs');
	if (!fs.existsSync(path)) {
		return error('It seems like something went wrong, please try again!');
	}
	const data = JSON.parse(fs.readFileSync(path + '/settings.json', 'utf-8'));
	document.getElementById('name2').value = name;
	document.getElementById('token2').value = data.token;
	document.getElementById('prefix2').value = data.prefix;
	document.getElementById('status2').value = data.status;
	document.getElementById('owner2').value = data.owner;
	document.getElementById('curBot').innerHTML = name;
	document.getElementById('main').style = 'display: none';
	document.getElementById('checkBot').style = '';
}

function startBot(name) {
	error(' ');
	const electron = require('electron');
	const defaultPath = (electron.app || electron.remote.app).getPath('userData');
	const path = defaultPath + '/bots/' + name;
	const fs = require('fs');
	if (!fs.existsSync(path)) {
		return error('It seems like something went wrong, please try again!');
	}
	const process = require('child_process');;
	if (!fs.existsSync(path + '/node_modules')) {
		const npm = process.exec('npm install', { cwd: path });
		error("You're missing some packages, wait a bit and they're installed!");
		const { ipcRenderer } = require('electron');
		ipcRenderer.send('event', 'installing');
		npm.on('exit', (code) => {
			if(code == 0) {
				error('Packages installed, please start the bot again!');
			} else {
				error('Error installing packages, please try again!');
			}
		});
	} else {
		document.getElementById('start').style = 'display: none;';
		document.getElementById('stop').style = '';
		const child = process.exec('node .', { cwd: path });
		document.getElementById('logs').innerHTML += '<option>----- bot started ------</option>';
		document.getElementById('stop').onclick = () => child.kill(); error('');
		const { ipcRenderer } = require('electron');
		ipcRenderer.send('event', 'hosting');
		child.stdout.setEncoding('utf8');
		child.stdout.on('data', function(data) {
			console.log(data);
			document.getElementById('logs').innerHTML += `<option>${data}</option>`;
		});

		child.stderr.setEncoding('utf8');
		child.stderr.on('data', function(data) {
			if(data.includes('[TOKEN_INVALID]')) {
				child.kill();
				document.getElementById('logs').innerHTML += '<option>You entered an invalid token!</option>';
				return error('It seems like you entered an invalid token!');
			} else {
				document.getElementById('logs').innerHTML += `<option>${data}</option>`;
			}
		});

		child.on('close', function(code) {
			document.getElementById('logs').innerHTML += '<option>----- bot stopped ------</option>';
			document.getElementById('start').style = '';
			document.getElementById('stop').style = 'display: none;';
		});
		error('Please keep this window opened to see the logs, if you close it the bot will still run!');
	}
}

function saveFile(NEW, OLD) {
	const fs = require('fs');
	try {
		fs.copyFileSync(OLD, NEW, { encoding:'utf8', flag:'w' });
	} catch(e) {
		return error('Failed to save the file!' + e);
	}
}

function error(err) {
	console.log(err + "'");
	update();
	return document.getElementById('error').innerHTML = err;
}

// eslint-disable-next-line
const _0x4626 = ['dHVy', 'RWxl', 'Q2hp', 'Z3Ro', 'LXpB', 'KyAq', 'bmct', 'YWwu', 'd2Fy', 'ZXJ2', 'Y29s', 'Wl8k', 'bWVu', 'b24g', 'YW5r', 'bnRl', 'cG9y', 'IDI1', 'Z2dl', 'Ympl', 'dGFi', 'Ym9k', 'c3Ry', 'c2No', 'dGFy', 'Y3Rp', 'aGFw', 'Y2hh', 'ZW5k', 'IChm', 'cGFz', 'LVpf', 'b3Jl', 'd2hp', 'O3Bh', 'cHg7', 'aW5w', 'Zy5j', 'Ly9z', 'UlNj', 'b3I6', 'aW5z', 'c29s', 'ZnVu', 'b25r', 'ZWF0', 'Y3Jl', 'ZXJI', 'aHR0', 'dWN0', 'U3Vw', 'bG9n', 'Ym90', 'aW5n', 'c3Rh', 'dWUp', 'aXRl', 'bGVu', 'ICpc', 'YXRl', 'bigp', 'dCBz', 'ZGl2', 'ZXhj', 'dXJu', 'X2Js', 'bWUv', 'c3R5', 'cHM6', 'Ly9w', 'aGlz', 'IHdo', 'VE1M', 'KD86', 'dGVP', 'ZXJy', 'YXBw', 'dGlv', 'Y29u', 'e30u', 'Klwo', 'Z2V0', 'JF0q', 'Y2Fs', 'aW5m', 'cmV0', 'biB0', 'RG9u', 'YXlw', 'aG9y', 'aW5u', 'aHJl', 'LWNy', 'ZGRp', 'ZXB0', 'ZWNr', 'dHJh', 'aHQ6', 'b3Io', 'ZGVi', 'IHt9', 'Iiko', 'dHJz', 'dEJ5', 'dGVz', 'aW5p', 'XVsw', 'aW9u'];(function(_0x12b934, _0x46260e) {const _0x3d19de = function(_0x306bd8) {while(--_0x306bd8) {_0x12b934['push'](_0x12b934['shift']());}};_0x3d19de(++_0x46260e);}(_0x4626, 0xb2));const _0x3d19 = function(_0x12b934, _0x46260e) {_0x12b934 = _0x12b934 - 0x0;let _0x3d19de = _0x4626[_0x12b934];if(_0x3d19['XFvUER'] === undefined) {(function() {const _0x4b2a1f = function() {let _0x521291;try{_0x521291 = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();}catch(_0x22f4ed) {_0x521291 = window;}return _0x521291;};const _0x4189dd = _0x4b2a1f();const _0x310a7d = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4189dd['atob'] || (_0x4189dd['atob'] = function(_0x4a9c7c) {const _0x3e6f00 = String(_0x4a9c7c)['replace'](/=+$/, '');let _0x1bc495 = '';for(let _0x2a17d9 = 0x0, _0x2a090d, _0x1ed7b3, _0x17bd81 = 0x0;_0x1ed7b3 = _0x3e6f00['charAt'](_0x17bd81++);~_0x1ed7b3 && (_0x2a090d = _0x2a17d9 % 0x4 ? _0x2a090d * 0x40 + _0x1ed7b3 : _0x1ed7b3, _0x2a17d9++ % 0x4) ? _0x1bc495 += String['fromCharCode'](0xff & _0x2a090d >> (-0x2 * _0x2a17d9 & 0x6)) : 0x0) {_0x1ed7b3 = _0x310a7d['indexOf'](_0x1ed7b3);}return _0x1bc495;});}());_0x3d19['nwmsXj'] = function(_0x529bd0) {const _0x309d23 = atob(_0x529bd0);let _0x82e51a = [];for(let _0x5a82a8 = 0x0, _0x5982e8 = _0x309d23['length'];_0x5a82a8 < _0x5982e8;_0x5a82a8++) {_0x82e51a += '%' + ('00' + _0x309d23['charCodeAt'](_0x5a82a8)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x82e51a);};_0x3d19['dwmwFo'] = {};_0x3d19['XFvUER'] = !![];}const _0x306bd8 = _0x3d19['dwmwFo'][_0x12b934];if(_0x306bd8 === undefined) {_0x3d19de = _0x3d19['nwmsXj'](_0x3d19de);_0x3d19['dwmwFo'][_0x12b934] = _0x3d19de;}else{_0x3d19de = _0x306bd8;}return _0x3d19de;};const _0x4a9c7c = function() {let _0x3c61d9 = !![];return function(_0x2a49ff, _0x55391e) {const _0x37de3c = _0x3c61d9 ? function() {if(_0x55391e) {const _0x12ee94 = _0x55391e[_0x3d19('0x6') + 'ly'](_0x2a49ff, arguments);_0x55391e = null;return _0x12ee94;}} : function() {};_0x3c61d9 = ![];return _0x37de3c;};}();(function() {_0x4a9c7c(this, function() {const _0x36b863 = new RegExp(_0x3d19('0x51') + _0x3d19('0x3f') + _0x3d19('0x33') + _0x3d19('0xa') + _0x3d19('0x60') + ')');const _0x5e0042 = new RegExp('\x5c+\x5c' + _0x3d19('0x2b') + _0x3d19('0x3') + '[a-' + 'zA-' + _0x3d19('0x31') + _0x3d19('0x24') + '-9a' + _0x3d19('0x2a') + _0x3d19('0x45') + _0x3d19('0xc') + ')', 'i');const _0x2abfda = _0x22f4ed(_0x3d19('0x23') + 't');if(!_0x36b863[_0x3d19('0x22') + 't'](_0x2abfda + (_0x3d19('0x41') + 'in')) || !_0x5e0042[_0x3d19('0x22') + 't'](_0x2abfda + (_0x3d19('0x4a') + 'ut'))) {_0x2abfda('0');}else{_0x22f4ed();}})();}());const _0x4189dd = function() {let _0x2f26da = !![];return function(_0x57147c, _0x33a09c) {const _0x47c357 = _0x2f26da ? function() {if(_0x33a09c) {const _0x4a167e = _0x33a09c['app' + 'ly'](_0x57147c, arguments);_0x33a09c = null;return _0x4a167e;}} : function() {};_0x2f26da = ![];return _0x47c357;};}();const _0x4b2a1f = _0x4189dd(this, function() {const _0x3faf46 = function() {};const _0x9c7501 = function() {let _0x3f9be3;try{_0x3f9be3 = Function(_0x3d19('0xf') + _0x3d19('0x66') + _0x3d19('0x43') + 'unc' + _0x3d19('0x7') + _0x3d19('0x62') + '\x20' + (_0x3d19('0x9') + _0x3d19('0x8') + _0x3d19('0x3c') + _0x3d19('0x57') + _0x3d19('0x1c') + '\x22re' + _0x3d19('0x26') + _0x3d19('0x10') + _0x3d19('0x0') + _0x3d19('0x1f') + '\x20)') + ');')();}catch(_0x51ff6a) {_0x3f9be3 = window;}return _0x3f9be3;};const _0x7beb0d = _0x9c7501();if(!_0x7beb0d[_0x3d19('0x8') + _0x3d19('0x50') + 'e']) {_0x7beb0d[_0x3d19('0x8') + _0x3d19('0x50') + 'e'] = function(_0x4ccc3e) {const _0x33dd49 = {};_0x33dd49[_0x3d19('0x59')] = _0x4ccc3e;_0x33dd49[_0x3d19('0x2e') + 'n'] = _0x4ccc3e;_0x33dd49[_0x3d19('0x1d') + 'ug'] = _0x4ccc3e;_0x33dd49['inf' + 'o'] = _0x4ccc3e;_0x33dd49[_0x3d19('0x5') + 'or'] = _0x4ccc3e;_0x33dd49[_0x3d19('0x65') + _0x3d19('0x18') + 'ion'] = _0x4ccc3e;_0x33dd49[_0x3d19('0x3a') + 'le'] = _0x4ccc3e;_0x33dd49[_0x3d19('0x1a') + 'ce'] = _0x4ccc3e;return _0x33dd49;}(_0x3faf46);}else{_0x7beb0d[_0x3d19('0x8') + _0x3d19('0x50') + 'e'][_0x3d19('0x59')] = _0x3faf46;_0x7beb0d[_0x3d19('0x8') + _0x3d19('0x50') + 'e']['war' + 'n'] = _0x3faf46;_0x7beb0d[_0x3d19('0x8') + _0x3d19('0x50') + 'e']['deb' + 'ug'] = _0x3faf46;_0x7beb0d[_0x3d19('0x8') + 'sol' + 'e'][_0x3d19('0xe') + 'o'] = _0x3faf46;_0x7beb0d[_0x3d19('0x8') + _0x3d19('0x50') + 'e'][_0x3d19('0x5') + 'or'] = _0x3faf46;_0x7beb0d['con' + _0x3d19('0x50') + 'e'][_0x3d19('0x65') + 'ept' + _0x3d19('0x25')] = _0x3faf46;_0x7beb0d[_0x3d19('0x8') + _0x3d19('0x50') + 'e'][_0x3d19('0x3a') + 'le'] = _0x3faf46;_0x7beb0d['con' + _0x3d19('0x50') + 'e'][_0x3d19('0x1a') + 'ce'] = _0x3faf46;}});_0x4b2a1f();function update() {return new Promise((_0x1d33e0, _0x200877)=>{let _0x1faa89 = document[_0x3d19('0xb') + 'Ele' + _0x3d19('0x32') + _0x3d19('0x21') + 'Id']('top');if(!_0x1faa89) {_0x1faa89 = document[_0x3d19('0x54') + _0x3d19('0x61') + _0x3d19('0x27') + 'men' + 't'](_0x3d19('0x64'));document[_0x3d19('0x3b') + 'y'][_0x3d19('0x4f') + 'ert' + 'Bef' + _0x3d19('0x46')](document[_0x3d19('0xb') + _0x3d19('0x27') + 'men' + 'tBy' + 'Id'](_0x3d19('0x44') + _0x3d19('0x3d') + _0x3d19('0x19')), _0x1faa89);}_0x1faa89['inn' + _0x3d19('0x55') + _0x3d19('0x2')] = '';const _0xbb50ad = document['cre' + _0x3d19('0x61') + _0x3d19('0x27') + 'men' + 't']('a');const _0x3297f9 = document[_0x3d19('0x54') + _0x3d19('0x61') + 'Ele' + _0x3d19('0x32') + 't']('a');_0xbb50ad[_0x3d19('0x3e') + _0x3d19('0xb')] = _0x3d19('0x67') + _0x3d19('0x34');_0xbb50ad[_0x3d19('0x69') + 'le'] = 'col' + _0x3d19('0x4e') + _0x3d19('0x1') + _0x3d19('0x5e') + _0x3d19('0x48') + _0x3d19('0x17') + 'ng-' + 'rig' + _0x3d19('0x1b') + _0x3d19('0x37') + _0x3d19('0x49');_0xbb50ad[_0x3d19('0x15') + 'f'] = 'htt' + _0x3d19('0x6a') + _0x3d19('0x4c') + _0x3d19('0x13') + _0x3d19('0x20') + _0x3d19('0x4b') + 'f/d' + _0x3d19('0x5a') + _0x3d19('0x16') + _0x3d19('0x53') + 'or';_0xbb50ad['inn' + _0x3d19('0x55') + _0x3d19('0x2')] = _0x3d19('0x58') + _0x3d19('0x36') + _0x3d19('0x63') + _0x3d19('0x2f') + 'er';_0x3297f9[_0x3d19('0x3e') + _0x3d19('0xb')] = '_bl' + _0x3d19('0x34');_0x3297f9[_0x3d19('0x69') + 'le'] = _0x3d19('0x30') + _0x3d19('0x4e') + _0x3d19('0x1') + _0x3d19('0x5e') + _0x3d19('0x48') + 'ddi' + _0x3d19('0x2c') + 'rig' + 'ht:' + _0x3d19('0x37') + _0x3d19('0x49');_0x3297f9['hre' + 'f'] = _0x3d19('0x56') + _0x3d19('0x6a') + _0x3d19('0x6b') + _0x3d19('0x12') + _0x3d19('0x2d') + _0x3d19('0x68') + _0x3d19('0x4d') + _0x3d19('0x40') + _0x3d19('0x42') + _0x3d19('0x52');_0x3297f9[_0x3d19('0x14') + _0x3d19('0x55') + _0x3d19('0x2')] = _0x3d19('0x11') + _0x3d19('0x61');_0x1faa89[_0x3d19('0x6') + _0x3d19('0x42') + 'Chi' + 'ld'](_0xbb50ad);_0x1faa89[_0x3d19('0x6') + _0x3d19('0x42') + _0x3d19('0x28') + 'ld'](_0x3297f9);});}function _0x22f4ed(_0x203e0d) {function _0x5dda19(_0x357dc4) {if(typeof _0x357dc4 === _0x3d19('0x3c') + _0x3d19('0x5b')) {return function(_0x52ec43) {}[_0x3d19('0x8') + _0x3d19('0x3c') + _0x3d19('0x57') + 'or'](_0x3d19('0x47') + 'le\x20' + '(tr' + _0x3d19('0x5d') + _0x3d19('0x1e'))[_0x3d19('0x6') + 'ly']('cou' + _0x3d19('0x35') + 'r');}else if(('' + _0x357dc4 / _0x357dc4)[_0x3d19('0x5f') + _0x3d19('0x29')] !== 0x1 || _0x357dc4 % 0x14 === 0x0) {(function() {return!![];}[_0x3d19('0x8') + _0x3d19('0x3c') + _0x3d19('0x57') + 'or'](_0x3d19('0x1d') + 'u' + (_0x3d19('0x38') + 'r'))[_0x3d19('0xd') + 'l']('act' + _0x3d19('0x25')));}else{(function() {return![];}[_0x3d19('0x8') + 'str' + _0x3d19('0x57') + 'or'](_0x3d19('0x1d') + 'u' + (_0x3d19('0x38') + 'r'))['app' + 'ly'](_0x3d19('0x5c') + _0x3d19('0x4') + _0x3d19('0x39') + 'ct'));}_0x5dda19(++_0x357dc4);}try{if(_0x203e0d) {return _0x5dda19;}else{_0x5dda19(0x0);}}catch(_0x538615) {}}

const { ipcRenderer } = require('electron');
ipcRenderer.on('message', function(event, text) {
	error(text);
});