import React from 'react';

import {
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import db from '../config/firebase';

const useStyles = makeStyles((theme) => ({
	root: {},
	margin: {
		margin: theme.spacing(1),
	},
}));

function Todo(props) {
	const classes = useStyles();

	const removeTodo = (e) => {
		db.collection('todos').doc(props.todo.id).delete();
	};

	return (
		<List className={classes.root}>
			<ListItem>
				<ListItemText primary={props.todo.text} secondary='dummy deadline' />
			</ListItem>

			<ListItemSecondaryAction>
				<IconButton
					aria-label='delete'
					className={classes.margin}
					onClick={removeTodo}
					type='submit'>
					<DeleteIcon fontSize='small' />
				</IconButton>
			</ListItemSecondaryAction>
		</List>
	);
}

export default Todo;
