import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import Profile2 from './components/Sample/Profile2.js';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleBabysitter from './pages/SingleBabysitter';
import Profile from './pages/Profile';
import SavedBabysitters from './pages/SavedBabysitters';
import Location from './components/Location';

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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/profiles/:email" component={Profile} />
            <Route exact path="/me" component={Profile} />
            <Route exact path="/babysitters/:babysitterId" component={SingleBabysitter} />
            <Route exact path="/saved" component={SavedBabysitters} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
