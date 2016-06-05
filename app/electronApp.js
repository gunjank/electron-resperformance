/*jslint es6 node:true */
"use strict";


const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
let win;

const hapiServer = require('./server');

let createWindow = function () {

    win = new BrowserWindow({
        width: 1024,
        height: 750
    });
    //console.log("hapiServer is ready " + hapiServer)
    win.loadURL('http://localhost:8080/');
    win.setMenu(null);

    win.on('closed', () => {
        win = null;
    });
};
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
