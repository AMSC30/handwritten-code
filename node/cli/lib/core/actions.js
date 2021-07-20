const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const config = require('./config')
const chalk = require('chalk')
const { spawnCommand } = require('../utils/spawn')

const create = async name => {
	try {
		// clone
		console.log(chalk.yellow(`creating project named ${name}`))
		await download(config.repoURL, name, { clone: true })
		console.log(chalk.yellow(`created ${name}`))

		const commandName = process.platform === 'win32' ? 'npm.cmd' : 'npm'

		// install
		await spawnCommand(commandName, ['install'], {
			cwd: `./${name}`
		})

		// run
		await spawnCommand(commandName, ['run', 'start'], {
			cwd: `./{name}`
		})
	} catch (error) {
		console.log(chalk.red(error.message))
	}
}

module.exports = { create }
