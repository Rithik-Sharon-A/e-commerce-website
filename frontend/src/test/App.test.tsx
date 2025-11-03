import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../App';

describe('App Component', () => {
  it('renders the app with Redux provider', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(screen.getByText(/Vite \+ React \+ TypeScript \+ Tailwind CSS/i)).toBeInTheDocument();
  });

  it('displays the count button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('count is 0');
  });
});


