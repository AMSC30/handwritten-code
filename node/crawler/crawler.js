const puppeteer = require('puppeteer')

const sleep = time =>
	new Promise(resolve => {
		setTimeout(resolve, time)
	})
const getInstance = async () => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		dumpio: false
	})

	const page = await browser.newPage()

	return {
		page,
		browser
	}
}

module.exports = async url => {
	const { page, browser } = await getInstance()

	await page.goto(url, {
		waitUntil: 'networkidle2'
	})

	await sleep(3000)

	await page.waitForSelector('.more')

	for (let i = 0; i < 10; i++) {
		await sleep(3000)

		await page.click('.more')
	}

	const result = await page.evaluate(() => {
		let $ = window.$
		let nodeItems = $('.list-wp a')
		let links = []

		if (nodeItems.length >= 1) {
			nodeItems.each((index, item) => {
				const elem = $(item)

				links.push({
					movieId: elem.find('div').data('id'),
					title: elem.find('.title').text(),
					rate: Number(elem.find('.rate').text()),
					poster: elem
						.find('img')
						.attr('src')
						.replace('s_ratio_poster', 'l_ratio_poster'),
					detailUrl: elem.attr('href')
				})
			})
		}

		return links
	})

	browser.close()

	return result
}
