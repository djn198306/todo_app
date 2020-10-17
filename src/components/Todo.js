import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {},
});

function Todo(props) {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			<ListItem>
				<ListItemText primary={props.text} secondary='dummy deadline' />
			</ListItem>
		</List>
	);
}

export default Todo;
