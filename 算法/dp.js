// 最长升序子序列
const arr = [7, 1, 6, 2, 3, 4]
const getLongestSubArr = arr => {
	if (arr.length === 0 || arr.length === 1) return arr
	let result = [[arr[0]]]
	for (let i = 1; i < arr.length; i++) {
		result[i] = [arr[i]]
		for (let j = i - 1; j > -1; j--) {
			const resultItem = result[j]
			if (resultItem.length >= result[i].length && resultItem[resultItem.length - 1] < arr[i]) {
				result[i] = [...resultItem, arr[i]]
			}
		}
	}
	let max = []
	for (let i = 0; i < result.length; i++) {
		if (result[i].length > max.length) {
			max = result[i]
		}
	}
	return max
}
// console.log(getLongestSubArr(arr))

// 青蛙跳台阶问题
const jumpFloor = n => {
	const dp = new Array(n + 1).fill(0)
	dp[1] = 1
	dp[2] = 2
	for (let i = 3; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2]
	}
	return dp[n]
}
// console.log(jumpFloor(10))
