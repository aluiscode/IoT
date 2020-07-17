'use strict'

const debug = require('debug')('platziverse:db:setup')
const config = require('./config')
const db = require('./')

async function setup () {
  const configLocal = {
    ...config,
    logging: s => debug(s),
    setup: true
  }

  await db(configLocal).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()