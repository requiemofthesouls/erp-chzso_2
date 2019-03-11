import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const renderApp = App => {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}
