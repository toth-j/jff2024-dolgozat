import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function typeintoForm({ nev, pont }) {
  const nameElement = screen.getByRole('textbox', {
    name: "Név"
  })
  const scoreElement = screen.getByLabelText("Pont");
  if (nev) {
    userEvent.type(nameElement, nev)
  }
  if (pont) {
    userEvent.type(scoreElement, pont)
  }
  return { nameElement, scoreElement }
}

function clickOnSubmitButton() {
  userEvent.click(screen.getByRole('button', { name: "Hozzáadás" }))
}

beforeEach(() => {
  render(<App />);
})
describe('Képernyő elemek', () => {
  test('Vannak üres input mezők', () => {
    expect(screen.getByLabelText("Név").value).toBe("");
    expect(screen.getByLabelText("Pont").value).toBe("");
  });
  test('Be lehet írni a nevet', () => {
    const { nameElement } = typeintoForm({ nev: "Kis Béla" })
    expect(nameElement.value).toBe("Kis Béla")
  })
  test('Be lehet írni a pontot és szám típusú a mező', () => {
    const { scoreElement } = typeintoForm({ pont: "51" })
    expect(scoreElement.value).toBe("51")
    expect(scoreElement.type).toBe("number")
  })
  test('Van Hozzáadás gomb', () => {
    const submitButton = screen.getByRole('button', { name: "Hozzáadás" })
    expect(submitButton).toBeInTheDocument()
  })
})
describe('Hibakezelés', () => {
  test('Hibaüzenet 3 karakternél rövidebb név esetén', async () => {
    typeintoForm({ nev: "aa" })
    clickOnSubmitButton();
    expect(await screen.findByText("A név nem lehet 3 karakternél rövidebb!")).toBeInTheDocument()
  })
  test('Hibaüzenet hibás pontszám esetén', async () => {
    typeintoForm({ nev: "aaa", pont: "" })
    clickOnSubmitButton();
    expect(await screen.findByText("A pont 0 és 100 közötti szám lehet!")).toBeInTheDocument()
    typeintoForm({ nev: "aaa", pont: "-1" })
    clickOnSubmitButton();
    expect(await screen.findByText("A pont 0 és 100 közötti szám lehet!")).toBeInTheDocument()
    typeintoForm({ nev: "aaa", pont: "101" })
    clickOnSubmitButton();
    expect(await screen.findByText("A pont 0 és 100 közötti szám lehet!")).toBeInTheDocument()
  })
})
describe('Lista', () => {
  test('A sikeres vizsga adatai helyesen megjelennek', async () => {
    typeintoForm({ nev: "Nagy Géza", pont: "78" })
    clickOnSubmitButton();
    const listElement = await screen.findByRole("listitem")
    expect(listElement.textContent).toBe("Nagy Géza: 78")
    expect(listElement.classList).not.toContain('text-danger')
  })
  test('A sikertelen vizsga adatai helyesen megjelennek', async () => {
    typeintoForm({ nev: "Kis Ibolya", pont: "49" })
    clickOnSubmitButton();
    const listElement = await screen.findByRole("listitem")
    expect(listElement.textContent).toBe("Kis Ibolya: 49")
    expect(listElement.classList).toContain('text-danger')
  })
})