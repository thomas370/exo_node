import io from 'socket.io-client';
import { useState } from 'react';
import Chat from "./Chat";
import uniqid from "uniqid";

const socket = io('http://localhost:8000');

function App() {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false);

    const joinRoom = (e) => {
        e.preventDefault();
        if (userName !== '' && room !== '') {
            socket.emit('join_room', {room, userName});
            setShowChat(true);
        }
    }
  return (
    <div className="App">
        { !showChat ? (
        <div className="chat-container">
            <h1>Rejoindre un Chat</h1>
            <form>
                <input type="text" placeholder="Pseudo.." onChange={ (e) => setUserName(e.target.value) }/>
                <input type="text" placeholder="ID du Chat.." onChange={ (e) => setRoom(e.target.value) }/>
                <button type="submit" onClick={joinRoom}>Rejoindre le chat</button>
            </form>
        </div>
            ) : (
            <div className="chat-container">
                <Chat socket={socket} userName={userName} room={room} />
            </div>
            )}
    </div>
  );
}

export default App;
