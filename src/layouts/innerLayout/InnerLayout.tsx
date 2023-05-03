import React, { useEffect,useState } from "react"
import {useHistory} from 'react-router-dom'
import InnerRouter,{initRoutes,IRoute} from "@/router/innerRouter";
const  InnerLayout :React.FC=()=>{
    //获取路由历史
    const history = useHistory();

    //路由配置
    const [routeMap,setRouteMap] = useState<IRoute[]>([]);
    useEffect(()=>{
        // 获取token
        const token = '';
        if(!token){
            history.replace('/account/login')
        }else{
            // 查询权限路由表
            const  permission = [{
                name:'dashboard'
            }];
            setRouteMap(initRoutes(permission))
        }
        
    },[history])
    return(
        <div className="inner-layout">
            <InnerRouter routeMap={routeMap}/>
        </div>
    )
}
export default InnerLayout