import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline'
import { GlobalCss, theme } from '~/common/mui/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { NotifsContextProvider } from './common/context'
import 'react-notifications-component/dist/theme.css'
// preferred way to import (from `v4`). Uses `animate__` prefix.
import 'animate.css/animate.min.css'
// @ts-ignore
import CookieDisclaimer from 'react-cookie-disclaimer';

const { REACT_APP_EXTERNAL_ROUTING } = process.env

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalCss />
        <NotifsContextProvider>
          <Switch>
            <Route key='/' path='/' exact={true} component={App} />
          </Switch>
        </NotifsContextProvider>
        <CookieDisclaimer 
          background='#556CD6' 
          bottomPosition={false}
          closeIconSize={25}
          closeIconPositionTop={false}
          color='#fff'
          cookiePolicyName='is-cookie-confirmed'
          cookiePolicyLink={`${REACT_APP_EXTERNAL_ROUTING || ''}/cookie-policy/`}
          cookiePolicyText='By continuing to use the service, you agree to our'
          text='This website uses cookies to improve service.'
        />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
