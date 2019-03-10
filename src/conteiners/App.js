import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatContainerALL from '../component/ChatContainerALL';
import {PrivateRoute} from '../component/PrivateRoute';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from "apollo-link-http";
import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context';
import HomePage from '../component/HomePage';
import EditProfile from '../component/EditProfile';


const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true
  }
})

const link = split(
  ({query}) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)


const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

class App extends Component {
 
  render() {
    return(
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <PrivateRoute path="/ChatContainerALL" exact={true} component={ChatContainerALL} />
              <Route path="/EditProfile" exact={true} component={EditProfile} />
            <Route path="/" exact={true} component={HomePage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
