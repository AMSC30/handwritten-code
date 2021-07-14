const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const config = require('./config')

const create = async name => {
	await download(config.repoURL, name, { clone: true })
}

module.exports = { create }
