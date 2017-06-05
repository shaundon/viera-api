# Viera API

Simple interface for controlling Panasonic Viera TVs.

This is based on [@samuelmatis's viera-control](https://github.com/samuelmatis/viera-control).
His repo is much more full featured, mine is just stripped down for my own uses.
For a better version, use his.

## Installation

```
npm install --save viera-api
```

## Usage

```
const Viera = require('viera-api');

Viera('IP of TV', 'code').then(
  (success) => {},
  (error) => {}
);
```
When successful, the promise body is `Success!`.

A full list of the codes can be found on [@samuelmatis's repo](https://github.com/samuelmatis/viera-control/blob/master/codes.txt).
Viera wraps the command with `NRC_<command>-ONOFF`, so you can just specify the command e.g. `POWER`.
You can specify the command in lowercase.

### Chaining commands

You can use comma separated values to chain commands, e.g.

```
Viera('192.168.1.1', 'volup,volup,volup')
```

This will increment the volume three times. Viera doesn't wait for commands
to return before firing another, the requests fire in quick succession.
