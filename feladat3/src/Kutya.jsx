export default function Kutya({ kutyaSrc, fetchDog }) {
  return (
    <div>
      <h1>Kutyák</h1>
      <img 
        src={kutyaSrc} 
        alt="kutya kép" 
        className='dog-image' 
      />
      <p><button onClick={fetchDog}>Következő</button></p>
    </div>
  )
}
