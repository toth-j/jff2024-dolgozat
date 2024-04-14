import { useState } from 'react'

function App() {
  const [hiba, setHiba] = useState("")
  const [nev, setNev] = useState("")
  const [pont, setPont] = useState('')
  const [eredmenyek, setEredmenyek] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    if (nev.length < 3) {
      setHiba("A név nem lehet 3 karakternél rövidebb!")
      return
    }
    if (pont === '' || pont < 0 || pont > 100) {
      setHiba("A pont 0 és 100 közötti szám lehet!")
      return
    }
    setEredmenyek([...eredmenyek, { nev, pont }])
    setNev('')
    setPont('')
    setHiba('')
  }

  return (
    <div className="container my-5">
      <h2 className='mb-3'>Vizsga</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nev" className='form-label'>
            Név
          </label>
          <input
            type="text"
            className='form-control'
            id='nev'
            value={nev}
            onChange={e => setNev(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pont" className='form-label'>
            Pont
          </label>
          <input
            type="number"
            className='form-control'
            id='pont'
            value={pont}
            onChange={e => setPont(e.target.value)}
          />
        </div>
        {hiba && <p className='alert alert-danger'>{hiba}</p>}
        <button
          type='submit'
          className='btn btn-primary mb-3'
          onClick={handleSubmit}
        >
          Hozzáadás
        </button>
      </form>
      <ul>
        {eredmenyek.map(eredmeny => (
          <li key={eredmeny.nev + eredmeny.pont} className={eredmeny.pont <= 50 ? 'text-danger' : ''}>
            {eredmeny.nev}: {eredmeny.pont}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
