import PageLoading from "@/components/base/page-loading/PageLoading"
import { Switch, RouteProps, Route } from 'react-router-dom'
import React, { Suspense } from "react"
import IRoute from "./IRoute"
//定义路由接口
interface IProps {
    routeMap: IRoute[]
}
const InnerRouter: React.FC<IProps> = ({ routeMap }) => {
    //根据路由配置生产路由表
    const getRoutes = (routeMap: IRoute[]) => {
        const routes: RouteProps[] = [];
        const getRoute = (routeMap: IRoute[]) => {
            routeMap.forEach(config => {
                const { path, component, exact, children } = config;
                if (children) {
                    getRoutes(children)// 递归查询路由配置
                } else {
                    routes.push({ path, exact, component })
                }
            })
        }
        getRoute(routeMap);
        return routes
    }
    return (
        <Suspense fallback={<PageLoading />}>
            <Switch>
                {
                    getRoutes(routeMap).map((route: RouteProps) => (
                        <Route key={route.path + ""} exact={route.exact} path={route.path} component={route.component}></Route>
                    ))
                }
            </Switch>
        </Suspense>
    )
}
export default InnerRouter