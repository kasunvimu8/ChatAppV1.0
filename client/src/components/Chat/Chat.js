import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";
import  Input from "../Input/Input";
import  Messages from "../Messages/Messages";

let socket;
const ENDPOINT = 'localhost:5000';

const Chat = (props) => {
    const [name, setName] = useState();
    const [room, setRoom] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // initializing
    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [props.location.search]);

    // handling messages
    useEffect(() => { 
      socket.on('message', (message) => {
        setMessages([...messages, message]);
      })
    }, [messages])


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
        {/* <input 
          value={message}
          onChange = {(event) => setMessage(event.target.value)}
          onKeyPress = {(event) => event.key === 'Enter' ? sendMessages(event) : null}
        /> */}
        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessages={sendMessages}/>
      </div>
    </div>
  );
};

export default Chat;
