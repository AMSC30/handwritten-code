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
			shape: 'rect',
			id: 'node2', // String，节点的唯一标识
			x: 200, // Number，必选，节点位置的 x 值
			y: 100, // Number，必选，节点位置的 y 值
			width: 200, // Number，可选，节点大小的 width 值
			height: 100, // Number，可选，节点大小的 height 值
			label: 'world', // String，节点标签
			ports: {
				groups: {
					group1: {
						markup: {
							tagName: 'circle',
							selector: 'circle',
							attrs: {
								r: 10,
								fill: '#fff',
								stroke: '#000'
							}
						},
						attrs: {
							circle: {
								r: 6
							}
						},
						zIndex: 1,
						position: {
							name: 'right',
							args: {}
						},
						label: {
							markup: {
								tagName: 'text',
								selector: 'text',
								attrs: {
									fill: '#000'
								}
							}
						}
					}
				},
				items: [
					{
						id: 'port1',
						group: 'group1',
						attrs: {
							text: {
								text: 'port1'
							}
						}
					},
					{
						id: 'port2',
						group: 'group1'
					},
					{
						id: 'port3',
						attrs: {
							circle: {
								r: 5
							}
						}
					}
				]
			}
		}
	],
	edges: [
		{
			source: 'node1',
			target: {
				cell: 'node2', // 哪个节点
				port: 'port1' // 哪个链接桩
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
		},
		{
			source: 'node1',
			target: {
				cell: 'node2', // 哪个节点
				port: 'port2' // 哪个链接桩
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
		size: 1, // 网格大小 10px
		visible: true // 渲染网格背景
	}
})
graph.fromJSON(data)
setTimeout(() => {}, 1500)
