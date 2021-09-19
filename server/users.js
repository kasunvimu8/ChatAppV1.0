const users = [];

const addUser = ({id, name, room}) => {
    const processedName = name.trim().toLowerCase();
    const processedRoom = room.trim().toUpperCase();
    const existingUser = users.find((user) => user.room === processedRoom && user.name === processedName);

    if (existingUser) {
        return {error: 'Username is taken'}
    }

    const user = { id, name: processedName, room:processedRoom};
    users.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
        return users.splice(index, 1)[0];
}

const getUser = (id) => {
    const user = users.find((user) => user.id === id);
    return user;
}

const getUsersInRoom = (room) => {
    const roomUsers = users.find((user) => user.room === room);
    return roomUsers;
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };