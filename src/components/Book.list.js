import React from 'react';

const Booklist = ({book,setBook,books, setListUpdated}) => {


    const handleDelete = (idbooks)=>{
        const requestInit = {
            method : 'DELETE',
        };
        fetch('http://localhost:9000/api/' + idbooks, requestInit)
            .then(res =>res.text())
            .then(res =>console.log(res));

        setListUpdated(true)//Se ha actualizado el estado
    }

    let{title,author,edition} = book;

    const handleUpdate = (idbooks)=>{
        edition = parseInt(edition, 10);
        //convierte el string a base 10

        //Validación de los datos
        if(book.title === '' || book.author === '' || book.edition <=0 ){
            alert('Por favor complete todos los campos');
            return
        };
        const requestInit = {
            method : 'PUT',
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(book)
        };
        fetch('http://localhost:9000/api/' + idbooks, requestInit)
            .then(res =>res.text())
            .then(res =>console.log(res));
        
        setBook({
            title: '',
            author: '',
            edition: 0 ,
        });

        setListUpdated(true)
    }

    return (  
        <table className='table'>
            <thead>
                <tr>
                    <th>ID Libro</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Edición</th>
                </tr>
            </thead>
            <tbody>
                {books.map( book => (
                    <tr key={book.idbooks}>
                        <td>{book.idbooks}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.edition}</td>
                        <td>
                            <div className='mb-3'>
                                <button onClick={()=>handleDelete(book.idbooks)} className='btn btn-danger'>Eliminar</button>
                            </div>
                            <div className='mb-3'>
                                <button onClick={()=>handleUpdate(book.idbooks)} className='btn btn-dark'>Editar</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default Booklist;