// 1.不传任何参数,根据系统时间创建Date对象
const date1 = new Date()

// 2.Unix时间戳
const date2 = new Date(3600 * 10 * 24 * 30 * 30)

// 3.时间戳字符串
const date3 = new Date('2021-07-05')

// 4.时间和日期的每一个成员
const date4 = new Date(2021, 6, 5, 15, 00, 00)

// 5.不以构造函数的形式调用
const date5 = Date()

console.log(date1, date2, date3, date4, date5)
