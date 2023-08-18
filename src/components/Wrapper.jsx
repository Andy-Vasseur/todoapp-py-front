import axios from 'axios';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

function Wrapper(props) {

    const [todosLength, setTodosLength] = useState(0);

    // Récupérer plus tard le nombre de todo de l'utilisateur et l'afficher dans le wrapper todoCount
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/todos')
            .then(response => {
                setTodosLength(response.data.todos.length);
            })
    }, [])

    return (
        <div className="Wrapper">
            <h1>{props.title}</h1>
            <p>Vous avez <span>{todosLength}</span> tâches à effectuer</p>
        </div>
    )
}

export default Wrapper

Wrapper.propTypes = {
    title: PropTypes.string.isRequired,
    todoCount: PropTypes.number.isRequired
}