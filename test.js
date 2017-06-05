/*
This file is a quick place for testing the functionality.
*/

const Viera = require('./index');

Viera('192.168.1.76', 'voldown').then(console.log, console.error);
