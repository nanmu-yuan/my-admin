
/**
 * 1.获取所有的类目
 * 2.按照权限过滤真是的路由表
 * 
 */
import IRoute from "./IRoute"
import dashboardRoute from './modules/dashboard'

const routeMap = [dashboardRoute]
//根据名称过滤路由表
const filterRouteMap = (routeNames: string[], routeMap: IRoute[]) => {
    const acceptedRouteMap: IRoute[] = [];
    routeMap.forEach((route: IRoute) => {
        if (routeNames.includes(route.name)) {
            acceptedRouteMap.push(route)
        } else {
            if (route.children) {
                route.children = filterRouteMap(routeNames, route.children)
                if (route.children.length > 0) {
                    acceptedRouteMap.push(route)
                }
            }
        }
    })
    return acceptedRouteMap
}
// 获取可以访问的路由表
const initRoutes = (permission)=>{
    const routeNames = permission.map(item=>item.name);
    return filterRouteMap(routeNames,routeMap)
}
export default initRoutes