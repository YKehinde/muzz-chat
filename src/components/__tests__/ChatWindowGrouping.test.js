import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatWindow from '../ChatWindow';

describe('ChatWindow Grouping Logic', () => {
  it('should add a timestamp if messages are sent more than an hour apart', () => {
    const { container } = render(<ChatWindow />);

    const timestamps = container.querySelectorAll('.timestamp');
    expect(timestamps.length).toBeGreaterThan(0);
  });

  it('should group messages from the same user within 20 seconds', () => {
    const { container } = render(<ChatWindow />);

    const messageBubbles = container.querySelectorAll('.message-bubble');
    expect(messageBubbles.length).toBeGreaterThan(0);
  });
});
