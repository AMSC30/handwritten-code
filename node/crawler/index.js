const sql = require('./mysql')
const crawler = require('./crawler')

const url = `https://movie.douban.com/tag/#/?sort=R&range=0,20&tags=电影`

const start = async url => {
	const result = await crawler(url)

	result.forEach(async movieInfo => {
		const accountSql = `INSERT INTO movies(name,poster,movieId,rate,detailURL) VALUES(?,?,?,?,?)`
		const params = [
			movieInfo.title,
			movieInfo.poster,
			movieInfo.movieId,
			movieInfo.rate,
			movieInfo.detailUrl
		]

		await sql.insert(accountSql, params)
	})
	return result
}

console.log(start(url))
