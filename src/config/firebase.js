import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyDjOyTBcHx_f89W-sa4YS49YbsLf0s5zrE',
	authDomain: 'todo-app-320c9.firebaseapp.com',
	databaseURL: 'https://todo-app-320c9.firebaseio.com',
	projectId: 'todo-app-320c9',
	storageBucket: 'todo-app-320c9.appspot.com',
	messagingSenderId: '1038480878399',
	appId: '1:1038480878399:web:d6076101aa140a38a7818a',
	measurementId: 'G-6169GVYF6V',
});

const db = firebaseApp.firestore();

export default db;
