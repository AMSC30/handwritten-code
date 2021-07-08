module.exports = {
	request: {
		method: 'GET',
		url: '/',
		header: {
			host: 'localhost:3000',
			connection: 'keep-alive',
			'sec-ch-ua': ' Not;A Brand;v=99',
			'Google Chrome': 'v=1',
			Chromium: 'v=91',
			'sec-ch-ua-mobile': '?0',
			'upgrade-insecure-requests': '1',

			'user-agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',

			accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'none',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-user': '?1',
			'sec-fetch-dest': 'document',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'zh-CN,zh;q=0.9'
		}
	},
	response: {
		status: 404,
		message: 'Not Found',
		header: {}
	},
	app: { subdomainOffset: 2, proxy: false, env: 'development' },
	originalUrl: '/',
	req: '<original node req>',
	res: '<original node res>',
	socket: '<original node socket>'
}
