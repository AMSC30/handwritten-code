const originList = [2, 3, 2, 5, 33, 676, 2, 1, 3, 64, 32, 8453, 112]
const swap = (list, a, b) => {
	;[list[a], list[b]] = [list[b], list[a]]
}
const getMiddleIndex = list => {
	return Math.floor(list.length / 2)
}
const merge = (left, right) => {
	let result = []

	while (left.length && right.length) {
		if (left[0] >= right[0]) {
			result.push(right.shift())
		} else {
			result.push(left.shift())
		}
	}

	if (left.length) {
		result.push(...left)
	}
	if (right.length) {
		result.push(...right)
	}
	return result
}
const bubbleSort = list => {
	const len = list.length
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - 1; j++) {
			if (list[j] > list[j + 1]) {
				swap(list, j, j + 1)
			}
		}
	}
}
const selectionSort = list => {
	let len = list.length
	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			if (list[i] > list[j]) {
				swap(list, i, j)
			}
		}
	}
}
const insertionSort = list => {
	let len = list.length

	for (let i = 1; i < len; i++) {
		for (let j = i; j > 0; j--) {
			if (list[j] < list[j - 1]) {
				swap(list, j, j - 1)
			} else {
				continue
			}
		}
	}
}
const mergeSort = list => {
	if (list.length === 1) return list
	let middle = getMiddleIndex(list)

	let left = list.slice(0, middle)
	let right = list.slice(middle, list.length)

	return merge(mergeSort(left), mergeSort(right))
}

const quicklySort = list => {
	if (list.length === 1 || list.length === 0) return list
	let middle = list[getMiddleIndex(list)]

	let left = []
	let right = []
	let center = []

	list.forEach(item => {
		if (item < middle) {
			left.push(item)
		} else if (item > middle) {
			right.push(item)
		} else {
			center.push(item)
		}
	})
	return quicklySort(left).concat(center, quicklySort(right))
}

console.log(quicklySort(originList))
