import {lazy} from 'react'
import IRoute from '../IRoute'

const route:IRoute={
    name: 'user',
	title: '用户管理',
	icon: 'menuUser',
	path: '/user',
	exact: true,
	component: 'User'
}
export default route