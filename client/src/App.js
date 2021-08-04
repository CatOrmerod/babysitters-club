import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import firebase from 'firebase';

import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleBabysitter from './pages/SingleBabysitter';
import Profile from './pages/Profile';
import SavedBabysitters from './pages/SavedBabysitters';
import Location from './components/Location';
import { Message } from "semantic-ui-react";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const firebaseConfig = {
  apiKey: "AIzaSyA7HHeD0obhBn_bma65XVG-Pnak6KcIntk",
  authDomain: "babysitters-club-co.firebaseapp.com",
  projectId: "babysitters-club-co",
  storageBucket: "babysitters-club-co.appspot.com",
  messagingSenderId: "592570863383",
  appId: "1:592570863383:web:98b632331f4471a1d83152",
  databaseURL: "https://babysitters-club-co.firebaseio.com"
  // measurementId: "G-L9R64LNE17"
};

const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })


// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();
// this is the listener for any message being created by firebase. It is either passed to the onMessageListener below if the page is active
// or the backgroundMessageHandler in the client/public/firebase-messaging-sw.js if the page is not the main focus.
// Currently there are no notifications that would run where the page wouldn't be in focus
messaging.onMessage(payload => {
  console.log('onMessage:', payload)
});

function App() {
  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState({ title: '', body: '' });
  // This is the active listener for when the webpage is in focus and firebase function will pass the payload to the message component.
  onMessageListener().then(payload => {
    setShow(true);
    setNotification({ title: payload.notification.title, body: payload.notification.body })
  }).catch(err => console.log('failed: ', err));
  const handleDismiss = () => {
    setShow(false)

  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          {/* shows up when there is a new notification sent from firebase messaging and the screen is active */}
          {(show) && <Message
            onDismiss={() => handleDismiss()}
            show={show}
            header={notification.title}
            content={notification.body}
          />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/me" component={Profile} />
            <Route exact path="/profiles/:username" component={Profile} />
            <Route exact path="/babysitters/:babysitterId" component={SingleBabysitter} />
            <Route exact path="/saved" component={SavedBabysitters} />
            <Route exact path="/location" component={Location} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
      <script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>
    </ApolloProvider>
  );
}

export default App;
