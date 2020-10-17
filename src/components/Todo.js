import React from 'react';

import {
	FormControl,
	IconButton,
	Input,
	InputLabel,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Modal,
} from '@material-ui/core/';
import {
	Close as CloseIcon,
	Done as DoneIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

import db from '../config/firebase';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {},
	margin: {
		margin: theme.spacing(1),
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function Todo(props) {
	const classes = useStyles();

	const { id, text } = props.todo;

	const [input, setInput] = React.useState(text);

	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setInput(text);
	};

	const updateTodo = (e) => {
		e.preventDefault();

		db.collection('todos').doc(id).set({ todo: input }, { merge: true });

		setOpen(false);
	};

	const removeTodo = () => {
		db.collection('todos').doc(id).delete();
	};

	const body = (
		<form style={modalStyle} className={classes.paper}>
			<FormControl>
				<InputLabel>Edit</InputLabel>
				<Input
					autoFocus
					onChange={(e) => setInput(e.target.value)}
					value={input}
					placeholder={text}
				/>
			</FormControl>

			<IconButton aria-label='done' onClick={updateTodo} type='submit'>
				<DoneIcon fontSize='small' />
			</IconButton>
			<IconButton aria-label='close' onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</form>
	);

	return (
		<>
			<List className={classes.root}>
				<ListItem>
					<ListItemText primary={text} secondary='dummy deadline' />
				</ListItem>

				<ListItemSecondaryAction>
					<IconButton
						aria-label='delete'
						className={classes.margin}
						onClick={handleOpen}>
						<EditIcon fontSize='small' />
					</IconButton>

					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby='simple-modal-title'
						aria-describedby='simple-modal-description'>
						{body}
					</Modal>

					<IconButton
						aria-label='delete'
						className={classes.margin}
						onClick={removeTodo}>
						<DeleteIcon fontSize='small' />
					</IconButton>
				</ListItemSecondaryAction>
			</List>
		</>
	);
}
