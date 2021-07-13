const commander = require('commander')

commander.version(require('../../package.json').version)

commander.on('--help', () => {
	console.log('')
	console.log('other')
})

commander.parse(process.argv)
