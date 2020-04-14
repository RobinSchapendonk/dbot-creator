const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const rich = require('discord-rpc');
const rpc = new rich.Client({ transport:'ipc' });
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
rpc.login({ clientId:'698899954470617091' }).catch(console.error);
let mainWindow;

if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);
	mainWindow.loadFile(path.join(__dirname, 'index.html'));
	mainWindow.webContents.on('new-window', function(e, url) {
		e.preventDefault();
		require('electron').shell.openExternal(url);
	});
};

app.on('ready', function() {
	createWindow();
	autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

const mainMenuTemplate = [
	{
		label:'Main',
		submenu:[
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click() {
					app.quit();
				},
			},
			{
				label: 'Toggle devtools',
				accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				},
			},
		],
	},
];

if(process.platform == 'darwin') {
	mainMenuTemplate.unshift({});
}

ipcMain.on('event', (event, arg) => {
	const startTimestamp = new Date();
	const object = {
		state: '',
		startTimestamp,
		largeImageKey: 'img',
		largeImageText: 'pornhub.com',
		instance: true,
	};
	if(arg == 'main') {
		object.state = 'On the main page';
		rpc.setActivity(object);
	} else if(arg == 'new') {
		object.state = 'Creating a new bot';
		rpc.setActivity(object);
	} else if(arg == 'update') {
		object.state = 'Updating a bot';
		rpc.setActivity(object);
	} else if(arg == 'made') {
		object.state = 'Made a new bot';
		rpc.setActivity(object);
	} else if(arg == 'installing') {
		object.state = 'Installing packages';
		rpc.setActivity(object);
	} else if(arg == 'hosting') {
		object.state = 'Hosting a bot';
		rpc.setActivity(object);
	}
});

autoUpdater.on('checking-for-update', () => {
	message('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
	message('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
	message('Update not available.');
});
autoUpdater.on('error', (err) => {
	message('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
	let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
	message(log_message);
});
autoUpdater.on('update-downloaded', (info) => {
	message('Update downloaded, installing');
	setTimeout(() => {
		autoUpdater.quitAndInstall();
	}, 2500);
});
app.on('window-all-closed', () => {
	app.quit();
});

function message(text) {
	log.info(text);
	mainWindow.webContents.send('message', text);
}