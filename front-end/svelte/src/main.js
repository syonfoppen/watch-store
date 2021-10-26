import App from './App.svelte';
var urlencoded = new URLSearchParams();
var requestOptions = {
	method: 'GET'
};
fetch("http://127.0.0.1:3001/api/users", requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));

const app = new App({
	target: document.body,
	props: {
		name: "erel"
	}
});

export default app;