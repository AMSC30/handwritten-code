const data = {
	nodes: [
		{
			shape: 'circle',
			id: 'node1', // String，可选，节点的唯一标识
			x: 40, // Number，必选，节点位置的 x 值
			y: 40, // Number，必选，节点位置的 y 值
			width: 160, // Number，可选，节点大小的 width 值
			height: 40, // Number，可选，节点大小的 height 值
			label: 'hello', // String，节点标签
			attrs: {
				body: {
					fill: '#FAE3D9',
					stroke: '#FFB6B9',
					strokeDasharray: '10,2'
				},
				label: {
					text: 'Hello',
					fill: '#61C0BF',
					fontSize: 16
				}
			}
		},
		{
			shape: 'ellipse',
			id: 'node2', // String，节点的唯一标识
			x: 40, // Number，必选，节点位置的 x 值
			y: 100, // Number，必选，节点位置的 y 值
			width: 80, // Number，可选，节点大小的 width 值
			height: 40, // Number，可选，节点大小的 height 值
			label: 'world' // String，节点标签
		}
	],
	edges: [
		{
			source: 'node1', // String，必须，起始节点 id
			target: 'node2', // String，必须，目标节点 id
			vertices: [
				{ x: 100, y: 200 },
				{ x: 300, y: 120 }
			],
			router: {
				name: 'orth',
				args: {}
			},
			labels: [
				{
					attrs: { label: { text: '连接', fill: '#61C0BF' } }
				}
			],
			attrs: {
				label: {
					text: '连接',
					fill: '#61C0BF'
				},
				line: {
					stroke: '#61C0BF'
				}
			}
		}
	]
}
const graph = new X6.Graph({
	container: document.getElementById('container'),
	width: 800,
	height: 600,
	panning: {
		enabled: true,
		modifiers: 'ctrl',
		eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
	},
	background: {
		color: '#BBDED6' // 设置画布背景颜色
	},
	grid: {
		size: 60, // 网格大小 10px
		visible: true // 渲染网格背景
	}
})
graph.fromJSON(data)
setTimeout(() => {}, 1500)
