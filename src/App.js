import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import {
	Button,
	Container,
	FormControl,
	Input,
	InputLabel,
} from '@material-ui/core/';

import Todo from './components/Todo';

import db from './config/firebase';

function App() {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		// reads from database
		db.collection('todos')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setTodos(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						text: doc.data().todo,
					}))
				);
			});
	}, []);

	const addTodo = (e) => {
		e.preventDefault();

		// write to database
		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput('');
	};

	return (
		<Container>
			<h1>Hello World</h1>
			<form>
				<FormControl>
					<InputLabel>Write a Todo</InputLabel>
					<Input onChange={(e) => setInput(e.target.value)} value={input} />
				</FormControl>

				<Button
					disabled={!input}
					onClick={addTodo}
					type='submit'
					variant='contained'
					color='primary'>
					Add Todo
				</Button>
			</form>

			<ul>
				{todos.map((todo, index) => (
					<Todo key={index} todo={todo} />
				))}
			</ul>
		</Container>
	);
}

export default App;
