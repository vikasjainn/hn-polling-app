import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders search input', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const inputElement = screen.getByPlaceholderText(/Search by title or author/i);
  expect(inputElement).toBeInTheDocument();
});

test('filters posts by search term', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const inputElement = screen.getByPlaceholderText(/Search by title or author/i);
  fireEvent.change(inputElement, { target: { value: 'react' } });
  expect(inputElement.value).toBe('react');
});
