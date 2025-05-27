import './App.css'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer'

function App() {
  return (
    <>
      <Navbar logoUrl={"https://i.ibb.co/r2pQ5CN5/logonuevo.png"} />
      <ItemListContainer texto={"Lista de Entradas para Conciertos"} />
    </>
  )
}

export default App