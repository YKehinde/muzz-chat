import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageBubble from '../MessageBubble';

describe('MessageBubble Component', () => {
  it('should render message content correctly', () => {
    const message = { content: 'Hello, World!' };
    const { getByText } = render(<MessageBubble message={message} isCurrentUser={false} />);
    expect(getByText('Hello, World!')).toBeInTheDocument();
  });

  it('should apply correct class for current user messages', () => {
    const message = { content: 'I am the user' };
    const { container } = render(<MessageBubble message={message} isCurrentUser={true} />);
    expect(container.firstChild).toHaveClass('current-user');
  });

  it('should apply correct class for other user messages', () => {
    const message = { content: 'I am another user' };
    const { container } = render(<MessageBubble message={message} isCurrentUser={false} />);
    expect(container.firstChild).not.toHaveClass('current-user');
  });
});
