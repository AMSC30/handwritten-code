const { program } = require('commander')
const createOptions = () => {
	program.version(require('../../package.json').version)

	program.option('-d | --destination', 'the destination')

	program.option('-P, --path <path>', 'the place')

	program.parse(process.argv)
}
module.exports = createOptions
