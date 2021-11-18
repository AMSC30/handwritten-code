const fs = require('fs')

const reader = fs.createReadStream('./os.js')
const writer = fs.createWriteStream('./os-copy.js')
// writer.cork()
reader.on('data', data => {
	setTimeout(() => {
		writer.write(data)
	}, 1000)
})

// writer.on('pipe', () => {
// 	writer.destroy();
// });
// reader.pipe(writer)
