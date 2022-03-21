import React, {Fragment, useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Booklist from './components/Book.list';
import Form from './components/Form';


function App() {

  const [book, setBook] = useState({
    title: '',
    author: '',
    edition: 0 ,
  });

  const [books, setbooks]= useState([]); //estado de todos los libros

  const [listUpdated, setListUpdated] = useState(false) //Actualiza el estado de la tabla

  useEffect(()=>{ //hace una consulta de los libros cargados en la bd
    const getBooks = () => {
      fetch('http://localhost:9000/api')
      .then(res =>res.json())
      .then(res =>setbooks(res))//se le pasa el array de libros
    }
    getBooks();
    setListUpdated(false)
  }, [listUpdated])


  return (
    <Fragment>
      <Navbar brand = 'Librería'/>
      <div className='container'>
        <div className='row'>
          <div className='col-7'>
            <h2 style={{textAlign:'center'}}>Lista de Libros</h2>
            <Booklist book={book} books={books} setListUpdated={setListUpdated}/> 
            {/*Se le pasan los libros del useState que se iteran*/}
          </div>
          <div className='col-5'>
            <h2 style={{textAlign:'center'}}>Formulario de Libros</h2>
            <Form book={book} setBook={setBook}/>
            {/*Recibe el esatdo de los libros*/}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
