const { spawn } = require('child_process')

const spawnCommand = (...args) => {
	return new Promise((resolve, reject) => {
		const childProcess = spawn(...args)

		childProcess.stdout.pipe(process.stdout)
		childProcess.stderr.pipe(process.stderr)

		childProcess.on('close', () => {
			resolve()
		})

		childProcess.on('error', error => {
			console.log(error.message)
			reject(error)
		})
	})
}

module.exports = { spawnCommand }
