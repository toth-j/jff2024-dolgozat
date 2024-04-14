import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function AppWithRoute({ routeName = '/' }) {
  return <MemoryRouter initialEntries={[routeName]} >
    <App />
  </MemoryRouter>;
}

it('van navigáció', () => {
  render(<AppWithRoute />);
  const navbar = screen.getByRole('navigation');
  expect(navbar).toBeInTheDocument();
});

it('induláskor a kezdőlap töltődik be', () => {
  render(<AppWithRoute />);

  const main = screen.getByText(/A kilátók többsége csak gyalog közelíthető meg/i);
  expect(main).toBeInTheDocument();

  const kilato = screen.queryByText(/Óvári messzelátó/i);
  expect(kilato).toBeNull();

  const kep = screen.queryByAltText(/somlyohegy/i);
  expect(kep).toBeNull();
});

it('a kezdőlapon van header, main és footer', () => {
  render(<AppWithRoute />);

  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement.tagName).toMatch(/^header$/i);
  const headingElement = screen.getByText('Balatoni kilátók');
  expect(headingElement.tagName).toMatch(/^h1$/i);
  expect(headerElement).toContainElement(headingElement);

  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();
  expect(mainElement.tagName).toMatch(/^main$/i);

  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();
  expect(footerElement.tagName).toMatch(/^footer$/i);
  expect(footerElement.textContent).toMatch(/^Készítette:/i);
});

it('a /kilatok útvonal jól működik', () => {
  render(<AppWithRoute routeName='/kilatok' />);

  const main = screen.queryByText(/A kilátók többsége csak gyalog közelíthető meg/i);
  expect(main).toBeNull();

  const kilato = screen.getByText(/óvári messzelátó/i);
  expect(kilato).toBeInTheDocument();

  const kep = screen.queryByAltText(/somlyohegy/i);
  expect(kep).toBeNull();
});

it('a /kepek útvonal jól működik', () => {
  render(<AppWithRoute routeName='/kepek' />);

  const main = screen.queryByText(/A kilátók többsége csak gyalog közelíthető meg/i);
  expect(main).toBeNull();

  const kilato = screen.queryByText(/óvári messzelátó/i);
  expect(kilato).toBeNull();

  const kep = screen.getByAltText(/somlyohegy/i);
  expect(kep).toBeInTheDocument();
});

it('a navigáció jól működik', async () => {
  render(<AppWithRoute />);

  const main = screen.queryByText(/A kilátók többsége csak gyalog közelíthető meg/i);
  expect(main).toBeInTheDocument();
  const kilato = screen.queryByText(/Óvári messzelátó/i);
  expect(kilato).toBeNull();

  const kilatoLink = screen.getByRole("link", { name: /Kilátók/i });
  userEvent.click(kilatoLink)
  const main2 = screen.queryByText(/A kilátók többsége csak gyalog közelíthető meg/i);
  expect(main2).toBeNull();
  const kilato2 = screen.queryByText(/Óvári messzelátó/i);
  expect(kilato2).toBeInTheDocument();

  const kepekLink = screen.getByRole("link", { name: "Képek" })
  userEvent.click(kepekLink)
  const main3 = screen.queryByText(/A kilátók többsége csak gyalog közelíthető meg/i);
  expect(main3).toBeNull();
  const kilato3 = screen.queryByText(/Óvári messzelátó/i);
  expect(kilato3).toBeNull();
});

