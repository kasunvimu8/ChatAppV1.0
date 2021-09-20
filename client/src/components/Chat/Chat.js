import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";
import  Input from "../Input/Input";
import  Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;
const ENDPOINT = 'localhost:5000';

const Chat = (props) => {
    const [name, setName] = useState();
    const [room, setRoom] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    // initializing
    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {
        });

        return () => {
          socket.disconnect();
          socket.off();
          
          setMessage('');
          setMessages([]);
          setUsers([]);
        }
    }, [props.location.search]);

    // handling messages
    useEffect(() => { 
      socket.on('message', (message) => {
        setMessages([...messages, message]);
      })

      socket.on('roomData', (roomData) => {
        setUsers(roomData? roomData.users : []);
      })
    }, [message, messages, users]);

    // function for sending messages

    const sendMessages = (event) => {
      event.preventDefault();

      if (message) {
        socket.emit('sendMessage', message, () => {
          setMessage('')
        });
      }
    }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessages={sendMessages}/>
      </div>
      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;
