import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './ChatWindow.css';
import MessageBubble from './MessageBubble';

interface Message {
  id: number;
  content: string;
  timestamp: Date;
  sender: 'me' | 'other';
  isGrouped?: boolean;
  type?: 'timestamp';
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const initialMessages: Message[] = [
      { id: 1, content: 'Hello!', timestamp: new Date(), sender: 'other' },
      { id: 2, content: 'How are you?', timestamp: new Date(), sender: 'other' },
      { id: 3, content: "I'm good, thanks!", timestamp: new Date(), sender: 'me' },
    ];
    setMessages(initialMessages);
  }, []);

  const scrollIntoView = (): void => {
    const messagesEnd = document.querySelector('.message-bubble:last-child');
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    messages && messages.length >= 16 && scrollIntoView();
  }, [messages]);

  const handleSendMessage = (): void => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        content: newMessage,
        timestamp: new Date(),
        sender: 'me',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const groupMessages = (): Message[] => {
    const groupedMessages: Message[] = [];
    let lastMessage: Message | null = null;

    messages.forEach(msg => {
      const currentTime = msg.timestamp;

      if (lastMessage) {
        const timeDiff = (currentTime.getTime() - lastMessage.timestamp.getTime()) / 1000;
        if (timeDiff > 3600) {
          groupedMessages.push({
            id: groupedMessages.length + 1,
            content: '',
            timestamp: currentTime,
            sender: 'other',
            type: 'timestamp',
          });
        }
      } else {
        groupedMessages.push({
          id: groupedMessages.length + 1,
          content: '',
          timestamp: currentTime,
          sender: 'other',
          type: 'timestamp',
        });
      }

      const isSameSender = lastMessage && lastMessage.sender === msg.sender;
      const timeDiff = lastMessage ? (msg.timestamp.getTime() - lastMessage.timestamp.getTime()) / 1000 : null;

      groupedMessages.push({
        ...msg,
        isGrouped: isSameSender && timeDiff !== null && timeDiff < 20 ? true : undefined,
      });

      lastMessage = msg;
    });

    return groupedMessages;
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {groupMessages().map(msg => {
          if (msg.type === 'timestamp') {
            return (
              <div key={msg.timestamp.toString()} className="timestamp">
                {msg.timestamp.toLocaleString()}
              </div>
            );
          }

          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isCurrentUser={msg.sender === 'me'}
              isGrouped={msg.isGrouped ?? false}
            />
          );
        })}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
