export default function (routes) {
    let { pathList, pathMap } = createRouteMap(routes)
    console.log(pathList, pathMap)
    function match() {}
    function addRoutes(routes) {
        createRouteMap(routes, pathList.pathMap)
    }
    return {
        match,
        addRoutes
    }
}

// 生成pathList、pathMap
// 1.做pathList、pathMap的初始化
// 2.递归处理pathList、pathMap
function createRouteMap(routes, pathList, pathMap) {
    pathList = pathList || []
    pathMap = pathMap || Object.create(null)

    addRouteRecode(routes, pathList, pathMap)

    return {
        pathList,
        pathMap
    }
}

// 添加环境记录
function addRouteRecode(routes, pathList, pathMap, parent) {
    routes.forEach(route => {
        let path = parent ? `${parent.path}/${route.path}` : route.path
        let record = {
            path,
            component: route.component,
            parent
        }

        if (!pathMap[path]) {
            pathList.push(path), (pathMap[path] = record)
        }

        if (route.children && route.children.length) {
            addRouteRecode(route.children, pathList, pathMap, record)
        }
    })
}
