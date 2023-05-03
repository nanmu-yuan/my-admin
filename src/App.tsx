import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PageLoading from './components/base/page-loading/PageLoading'
const OuterLayout = React.lazy(()=>import('@/layouts/outerLayout'))
const InnerLayout = React.lazy(()=>import('@/layouts/innerLayout'))
const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<PageLoading />}>
                <Switch>
                    <Route path="/account" component={OuterLayout}></Route>
                    <Route path="/" component={InnerLayout}></Route>
                </Switch>
            </Suspense>
        </Router>
    )
}
export default App