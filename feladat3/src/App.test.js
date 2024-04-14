import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Replace the fetch function so that it returns a known, dummy data
global.fetch = async function mockFetch() {
  return {
    status: 200,
    statusText: 'OK',
    ok: true,
    json: async () => {
      return {
        "message": "https://images.dog.ceo/breeds/terrier-lakeland/n02095570_3745.jpg",
        "status": "success"
      };
    }
  };
}

it('megjeleníti a spinnert', () => {
  render(<App />);
  const imageElement = screen.getByAltText(/Betöltés/i);
  expect(imageElement).toBeInTheDocument();
});

it('megjeleníti a képet', async () => {
  render(<App />);
  const kep = await screen.findByAltText("kutya kép");
  expect(kep.src).toBe("https://images.dog.ceo/breeds/terrier-lakeland/n02095570_3745.jpg");
});
