'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const config = require('./config')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you shure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happend!!')
  }

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
  console.error(`${chalk.red('[Error: ]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
