import React, { useState, useEffect, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import uniqid from 'uniqid';

const Chat = ({ socket, userName, room }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [users, setUsers] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [send, setSend] = useState(false);
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    const time = hours + ':' + minutes;

    const scrollRef = useRef();

    const handleChange = (e) => {
        setCurrentMessage(e.target.value);
        setSend(e.target.value !== '');
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage !== '') {
            const messageData = {
                id: uniqid(),
                room: room,
                author: userName,
                message: currentMessage,
                time: time,
            };
            await socket.emit('send_message', messageData);
            setMessageList([...messageList, messageData]);
            setCurrentMessage('');
            setSend(false);
        }
    };

    const handleTyping = () => {
        socket.emit('typing', userName);
    }

    const handleTypingStop= () => {
        socket.emit('typing-stop', userName);
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((prevList) => {
                if (prevList.find((msg) => msg.id === data.id)) {
                    return prevList;
                } else {
                    return [...prevList, data];
                }
            });
        });
    }, [socket]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageList]);


    useEffect(() => {
        socket.on('user-typing', (data) => {
            setIsTyping(data);
        });
    }, [socket]);

    useEffect(() => {
        socket.on('user-typing-stop', (data) => {
            setIsTyping(false);
        });
    }, [socket]);


    useEffect(() => {
        socket.on('users', (users) => {
            setUsers(users);
        });
    }, []);

    return (
        <>
            <div className="sidebar">
                <h3>Utilisateurs connectés</h3>
                <div className="sidebar-list">
                    <ul>
                        {users.map((user) => (
                                <li key={user}>{user}</li>
                        ))}
                    </ul>
                </div>
            </div>
        <div className="livechat">
            <div className="chat-header">
                <p>Live Chat : {room}</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="chat-body message-container">
                    {messageList.map((messageContent) => (
                        <div className="message" key={messageContent.id} id={userName === messageContent.author ? 'you' : 'other'}>
                            <span>{messageContent.message}</span>
                            <span className="meta">{messageContent.time} {messageContent.author}</span>
                        </div>
                    ))}
                    <div ref={scrollRef}></div>
                </ScrollToBottom>
            </div>
            <form className="chat-footer" onSubmit={sendMessage}>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Envoyer un message"
                    onChange={handleChange}
                    onFocus={handleTyping}
                    onBlur={handleTypingStop}
                />
                <button disabled={!send} onClick={sendMessage}>
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
            {isTyping && <span className="text-loader">{userName} est en train d'écrire  <i className="loader"></i></span>}
        </div>
        </>
    );
};

export default Chat;
