import React from 'react'
import IRoute from '../IRoute'
const Dashboard = React.lazy(()=>import('@/page/dashboard'))

const route:IRoute={
    name:'dashboard',
    title:'首页',
    icon:'menuHome',
    path:'/dashboard',
    exact:true,
    component:Dashboard
}

export default route