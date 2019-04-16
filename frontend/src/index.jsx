import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import './public/css/index.css';
import './public/css/App.css';

import rootReducer from './store/reducers';
import App from './components/App';
import MyAppContainer from './containers/App';


const store = createStore(rootReducer);

const renderApp = MyAppContainer => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <MyAppContainer/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(MyAppContainer);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(MyAppContainer);
  });
}
