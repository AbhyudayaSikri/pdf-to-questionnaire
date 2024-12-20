import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const headingElement = screen.getByText(/Ontario OCF-1 PDF to Questionnaire/i);
  expect(headingElement).toBeInTheDocument();
});
