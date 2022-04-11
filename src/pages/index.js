import React from 'react'
import {
  BrowserRouter, Switch, Redirect, Route,
} from 'react-router-dom'
import AuthLayout from 'components/layout/AuthLayout'
import MainLayout from 'components/layout/MainLayout'
import OnboardLayout from 'components/layout/OnboardLayout'
import BasicRoute from 'components/router/BasicRoute'
import AuthenticatedGuard from 'components/guard/AuthenticatedGuard'
import AuthGuard from 'components/guard/AuthGuard'
import MainGuard from 'components/guard/MainGuard'
import OnboardGuard from 'components/guard/OnboardGuard'
import { RegisteredPages } from './RegisteredPages'
import NoMatch from './Common/NoMatch'

const Pages = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`(${RegisteredPages.filter((r) => r.type === 'un-auth').map((u) => u.path).join('|')})`}>
        <AuthGuard>
          <AuthLayout>
            {RegisteredPages.filter((r) => r.type === 'un-auth').map((route) => (
              <BasicRoute
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </AuthLayout>
        </AuthGuard>
      </Route>
      <Route path={`(${RegisteredPages.filter((r) => r.type.startsWith('authenticated')).map((u) => u.path).join('|')})`}>
        <AuthenticatedGuard>
          <Route path={`(${RegisteredPages.filter((r) => r.type === 'authenticated').map((u) => u.path).join('|')})`}>
            <MainGuard>
              <MainLayout>
                {RegisteredPages.filter((r) => r.type === 'authenticated').map((route) => (
                  <BasicRoute
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
              />
                ))}
              </MainLayout>
            </MainGuard>
          </Route>
          <Route path={`(${RegisteredPages.filter((r) => r.type === 'authenticated-onboard').map((u) => u.path).join('|')})`}>
            <OnboardGuard>
              <OnboardLayout>
                {RegisteredPages.filter((r) => r.type === 'authenticated-onboard').map((route) => (
                  <BasicRoute
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
              />
                ))}
              </OnboardLayout>
            </OnboardGuard>
          </Route>
        </AuthenticatedGuard>
      </Route>
      <Route path="/404" exact component={NoMatch} />
      <Route path="*" component={() => (<Redirect to="/trang-chu" />)} />
    </Switch>
  </BrowserRouter>
)

export default Pages
