const { program } = require('commander')
const { create } = require('./actions')

const createCommands = () => {
	program.command('create <name>').description('clone a repository to computer').action(create)
}
module.exports = createCommands
