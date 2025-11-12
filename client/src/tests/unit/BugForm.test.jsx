import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import BugForm from '../../components/BugForm';

jest.mock('axios');

describe('BugForm Component', () => {
  test('shows validation error when title is empty', () => {
    render(<BugForm />);
    fireEvent.click(screen.getByText(/Report Bug/i));
    expect(screen.getByRole('alert')).toHaveTextContent('Title is required');
  });

  test('submits valid form and shows success message', async () => {
    axios.post.mockResolvedValue({ data: { _id: '1', title: 'Bug' } });
    render(<BugForm />);
    fireEvent.change(screen.getByTestId('title-input'), {
      target: { value: 'Bug title' },
    });
    fireEvent.change(screen.getByTestId('desc-input'), {
      target: { value: 'Bug description' },
    });
    fireEvent.click(screen.getByText(/Report Bug/i));
    const msg = await screen.findByTestId('created-msg');
    expect(msg).toBeInTheDocument();
  });
});
