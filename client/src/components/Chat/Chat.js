import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from 'socket.io-client';

let socket;
const ENDPOINT = 'localhost:5000';

const Chat = (props) => {
    const [name, setName] = useState();
    const [room, setRoom] = useState();

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

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default Chat;
