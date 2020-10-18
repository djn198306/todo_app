import React from 'react';
import firebase from 'firebase';

import {
	Button,
	FormControl,
	Grid,
	Input,
	InputLabel,
	Paper,
	Typography,
} from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';

import Todo from './components/Todo';

import db from './config/firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
	},
}));

export default function App() {
	const classes = useStyles();

	const [input, setInput] = React.useState('');
	const [todos, setTodos] = React.useState([]);

	const addTodo = (e) => {
		e.preventDefault();

		// write to database
		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput('');
	};

	React.useEffect(() => {
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

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm container>
						<Grid item xs container direction='column' spacing={2}>
							<Grid item xs>
								<Typography gutterBottom variant='subtitle1'>
									TODO List
								</Typography>
							</Grid>

							<Grid item>
								<form>
									<FormControl>
										<InputLabel>Write a Todo</InputLabel>
										<Input
											onChange={(e) => setInput(e.target.value)}
											value={input}
										/>
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
							</Grid>

							<Grid item>
								<ul>
									{todos.map((todo) => (
										<Todo key={todo.id} todo={todo} />
									))}
								</ul>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
