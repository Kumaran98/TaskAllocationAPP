import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tasks and team members', () => {
  // Render the App component
  render(<App />);
  
  // Check if task and team member elements are present
  const tasksElement = screen.getByText(/Tasks/i);
  const teamMembersElement = screen.getByText(/Team Members/i);

  // Assert that the elements are present in the document
  expect(tasksElement).toBeInTheDocument();
  expect(teamMembersElement).toBeInTheDocument();
});
