import React from 'react';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: {
    content: string;
  };
  isCurrentUser: boolean;
  isGrouped: boolean;
}

const MessageBubble = ({ message, isCurrentUser, isGrouped }: MessageBubbleProps) => {
  return (
    <div className={`message-bubble ${isCurrentUser ? 'current-user' : ''} ${isGrouped ? 'grouped' : ''}`}>
      {message.content}
    </div>
  );
};

export default MessageBubble;
