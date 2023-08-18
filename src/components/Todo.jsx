import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { BsPencilFill } from 'react-icons/bs'

function Todo() {

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/todos')
            .then(response => {
                setTodos(response.data.todos);
            })
    }, [])


    const handleFormSubmit = (event) => {
        event.preventDefault()

        const form = event.target
        const title = form[0].value
        const description = form[1].value

        const todo = {
            title,
            description
        }

        axios.post("http://127.0.0.1:5000/api/addtodo", todo)
            .then(response => {
                console.log(response)
                setMessage("Nouvel tâche ajoutée avec succès ! Rafraichissez la page pour voir le changement")
            })
    }

    const DeleteTask = (event) => {
        event.preventDefault();

        const buttonID = parseInt(event.currentTarget.id); // Utilisez event.currentTarget pour obtenir l'élément sur lequel l'événement est déclenché
        console.log(buttonID);

        axios.delete(`http://127.0.0.1:5000/api/todos/${buttonID}`)
            .then(response => {
                console.log(response);
                setMessage("Tâche supprimée avec succès ! Rafraichissez la page pour voir le changement")
            });
    };

    return (
        <div className="TodoContainer">
            <div className="TodoContainer-header">
                <form method="POST" onSubmit={handleFormSubmit} className="TodoContainer-header-inputs">
                    <input
                        type="text"
                        placeholder="Titre de la tâche..."
                    />
                    <input
                        type="text"
                        placeholder="Description de la tâche..."
                    />
                    <button type="submit">Add todo</button>
                </form>
            </div>
            <div className="TodoContainer-main">
                <ul className="TodoContainer-main-todos">
                    {
                        message !== '' &&
                        <div className="TodoContainer-main-todos-message">
                            <p>{message}</p>
                        </div>
                    }
                    {
                        todos.length === 0 && message === '' ? (
                            <p>Aucunes tâches</p>
                        ) : (
                            todos.map((todo, index) => {
                                return (
                                    <li className='Todo' key={todo.id}>
                                        <span className='Todo-id'>{index + 1}</span>
                                        <h3 className='Todo-title'>{todo.title}</h3>
                                        <p className='Todo-description'>{todo.description}</p>
                                        <div className="Todo-buttons">
                                            <button className='Todo-buttons-btn'>
                                                <span className='modifiy-btn' onClick={DeleteTask} id={todo.id}>
                                                    <BsPencilFill />
                                                </span>
                                            </button>
                                            <button className='Todo-buttons-btn'>
                                                <span onClick={DeleteTask} id={todo.id}>
                                                    <FaTrash />
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        )
                    }
                </ul>
            </div>
        </div >
    )
}

export default Todo