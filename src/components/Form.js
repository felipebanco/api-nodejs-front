import React from 'react'

const Form = ({book,setBook}) => {

    const handleChange = entrada =>{ //Función para cargar libros
        
        setBook({
            ...book, //Mantiene el estado
            [entrada.target.name]: entrada.target.value
        });
    };

    let{title,author,edition} = book;

    const handleSubmit = ()=>{

        edition = parseInt(edition, 10);
        //convierte el string a base 10

        //Validación de los datos
        if(book.title === '' || book.author === '' || book.edition <=0 ){
            alert('Por favor complete todos los campos');
            return
        };

        const requestInit = {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(book)

        };

        //consulta
        fetch('http://localhost:9000/api', requestInit)
            .then(res =>res.text())
            .then(res =>console.log(res));

        //reiniciando state del libro
        setBook({
            title: '',
            author: '',
            edition: 0 ,
        });
    };

    
    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='title' className='form-label'>Título</label>
                <input value={title} name='title' onChange={handleChange} type='text' id='title' className='form-control' required/>
                {/*onChange es el evento que recive el formulario*/}
            </div>
            <div className='mb-3'>
                <label htmlFor='author' className='form-label'>Autor</label>
                <input value={author} name='author' onChange={handleChange} type='text' id='author' className='form-control' required/>
            </div>
            <div className='mb-3'>
                <label htmlFor='edition' className='form-label'>Edición</label>
                <input value={edition} name='edition' onChange={handleChange} type='number' id='edition' className='form-control' required/>
            </div>
            <button type='submit' className='btn btn-primary'>Insertar Libro</button> 
        </form>
    );
}
 
export default Form;