import React, { Suspense } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import PageLoading from '@/components/base/page-loading'

const Login = React.lazy(()=> import('@/page/account/login'))
const Register = React.lazy(()=> import('@/page/account/register'))
const routes: RouteProps[] = [
    {
        path: '/account/login',
        exact: true,
        component:Login
    },
    {
        path: '/account/register',
        exact: true,
        component: Register
    }
]
const OuterRouter: React.FC = () => (
	<Suspense fallback={<PageLoading />}>
		<Switch>
			{routes.map((route: RouteProps) => (
				<Route key={route.path + ''} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	</Suspense>
)

export default OuterRouter