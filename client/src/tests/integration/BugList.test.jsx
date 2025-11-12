import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import BugList from '../../components/BugList';

jest.mock('axios');

describe('BugList Integration', () => {
  test('renders empty state when no bugs', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<BugList />);
    await waitFor(() => {
      expect(screen.getByTestId('empty')).toBeInTheDocument();
    });
  });

  test('renders bug items when bugs exist', async () => {
    axios.get.mockResolvedValue({
      data: [{ _id: '1', title: 'Bug1', description: 'Desc', status: 'open' }],
    });
    render(<BugList />);
    await waitFor(() => {
      expect(screen.getByText('Bug1')).toBeInTheDocument();
    });
  });
});
