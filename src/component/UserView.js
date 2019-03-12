
import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button } from 'reactstrap';
import './ChatContainerALL.css';

const view = gql`
	query userOverview ($id: Int!){
		userOverview (id: $id){
      username
      id
      is_logged_in
    }
	}
`;

const UserAdded = gql`
    subscription{
        UserAdded
    }
`;

const handle_onclick = (user, args) => {
    if (user.id > args.id) {
      args.ChangingRoom(user.id.toString() + args.id.toString())
    }
    else if (user.id < args.id) {
      args.ChangingRoom(args.id.toString() + user.id.toString())
    }
    else {
    }
};

const UserItem = ({ user, args }) => (
    <li className='listItems'>
      <Button className='users' onClick={ () => handle_onclick( user, args )}><span className='userName'> {user.username} </span></Button>
    </li>
  );

const UserView = class extends Component {
    /*componentDidMount() {
        this.props.subscribeToMore();
      }*/
    render() {
        const { data } = this.props;
        const { args } = this.props;
        return (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {data.userOverview.map(data => <UserItem key={data.id} user={ data } args = { args } />)}
          </ul>
        );
    }
}

const UserList = (args) => (
    <Query query={view} variables={{id: args.id}} >
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const more = () => subscribeToMore({
          document: UserAdded,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            return Object.assign({}, prev, {
              view: [...prev.view, subscriptionData.data.UserAdded],
            });
          },
        });
        return <UserView data={data} subscribeToMore={more} args={args}/>;
      }}
    </Query>
  );

export default UserList