const fs = require('fs');

const reader = fs.createReadStream('./os.js');
const writer = fs.createWriteStream('./os-copy.js');
// writer.on('pipe', () => {
// 	writer.destroy();
// });
reader.pipe(writer);
