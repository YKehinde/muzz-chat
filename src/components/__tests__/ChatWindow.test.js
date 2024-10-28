import React, { act } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatWindow from '../ChatWindow';

describe('ChatWindow Component', () => {
  it('should render initial messages', () => {
    const { getByText } = render(<ChatWindow />);
    expect(getByText('Hello!')).toBeInTheDocument();
    expect(getByText('How are you?')).toBeInTheDocument();
  });

  it('should group messages by time and sender', () => {
    const { container, getByText } = render(<ChatWindow />);

    const timestamp = container.querySelector('.timestamp');
    expect(timestamp).toBeInTheDocument();

    expect(getByText('Hello!')).toBeInTheDocument();
    expect(getByText('How are you?')).toBeInTheDocument();
  });

  it('should send a new message', () => {
    const { getByPlaceholderText, getByText } = render(<ChatWindow />);

    const input = getByPlaceholderText('Type a message...');
    act(() => {
      fireEvent.change(input, { target: { value: 'A new message' } });
    });

    const sendButton = getByText('Send');
    act(() => {
      fireEvent.click(sendButton);
    });

    expect(getByText('A new message')).toBeInTheDocument();
  });

  it('should clear input after sending a message', () => {
    const { getByPlaceholderText, getByText } = render(<ChatWindow />);

    const input = getByPlaceholderText('Type a message...');
    act(() => {
      fireEvent.change(input, { target: { value: 'Another message' } });
    });

    const sendButton = getByText('Send');
    act(() => {
      fireEvent.click(sendButton);
    });

    expect(input.value).toBe('');
  });

  it('should not send an empty message', () => {
    const { getByPlaceholderText, getByText } = render(<ChatWindow />);

    const input = getByPlaceholderText('Type a message...');
    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    const sendButton = getByText('Send');
    act(() => {
      fireEvent.click(sendButton);
    });

    expect(input.value).toBe('');
  });

  it('should call scrollIntoView when a new message is sent after 17 messages', () => {
    const scrollIntoView = jest.fn();
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    const { getByPlaceholderText, getByText } = render(<ChatWindow />);

    const input = getByPlaceholderText('Type a message...');
    const sendButton = getByText('Send');

    for (let i = 0; i < 17; i++) {
      act(() => {
        fireEvent.change(input, { target: { value: `Message ${i}` } });
      });

      act(() => {
        fireEvent.click(sendButton);
      });
    }

    act(() => {
      fireEvent.change(input, { target: { value: 'Message 17' } });
    });

    act(() => {
      fireEvent.click(sendButton);
    });

    expect(scrollIntoView).toHaveBeenCalled();

    // Restore the original function
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });
});
