import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './ChatBox.css';


const messageAddedSubscription = gql`
    subscription($chatroomId: String!){
    messageAdded(chatroomId: $chatroomId ) {
    	id 
    	username
    	text
    	createdAt
    }
  }
`; 

const messagesQuery = gql` 
	query messages($chatroomId: String!){
	messages(chatroomId: $chatroomId) {
		id
		username
		text
		createdAt
	}
}
`;

const longToDate = (millisec) => {
  var db_time = parseInt(millisec)
  var db_time2 = new Date(db_time)
  var date = db_time2.toLocaleDateString();
  var time = db_time2.toLocaleTimeString();
  return time + " " + date
}

const MessageItem = ({ message }) => (
  <li className='listItems' >
    <span className='userName'>{message.username}: </span>
    <span className='spaceBetween'>&nbsp;&nbsp;&nbsp;</span>
     <span className='messages'> {message.text} </span> 
     <span className='spaceBetween'>&nbsp;&nbsp;&nbsp;</span>
     <span className='createdAt'> {longToDate(message.createdAt)} </span> 
    
  </li>
);

const MessageListView = class extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    return (
      <ul style={{ listStyleType: 'none', padding: 5 }}>
      {data.messages.map(message => <MessageItem key={message.id} message={message} />)}
      </ul>
    );
  }
};

const MessageList = (chatroomId) => (
  <Query query={messagesQuery} variables={{chatroomId: chatroomId.chatroomId}}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const more = () => subscribeToMore({
        document: messageAddedSubscription,
        variables: {
          chatroomId: chatroomId.chatroomId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, {
            messages: [...prev.messages, subscriptionData.data.messageAdded],
          });
        },
      });
      return <MessageListView data={data} subscribeToMore={more}/>;
    }}
  </Query>
);

export default MessageList;