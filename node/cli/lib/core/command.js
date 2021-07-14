const { program } = require('commander')
const { create } = require('./actions')

const createCommands = () => {
	program.command('create <name>').description('clone a repository to computer').action(create)

	program.parse(process.argv)
}
module.exports = createCommands
