const debug = require('debug')('platzi-verse:mqtt')
const mosca = require('mosca');
const redis = require('redis');
const chalk = require('chalk');

const backend = {
  type: 'redis',
  redis,
  return_buffers: true,
}

const setting = {
  port: 1883,
  backend,
}

const server = new mosca.Server(setting);

server.on('ready', () => {
  console.log(`${chalk.green('[platziverse-mqtt]')} server is runnig`)
})