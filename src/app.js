import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// React-Dates
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// Styles
import 'normalize.css/normalize.css'; // normalizing styles for all browsers
import './styles/style.scss';
// Router
import AppRouter, { history } from './routers/appRouter';
// Store from redux
import configureStore from './store/configureStore';
// component
import LoadingPage from './components/LoadingPage';

// FirebaseDB
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// This help us to know the state of auth!
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Here is login
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    // Here is logout
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
