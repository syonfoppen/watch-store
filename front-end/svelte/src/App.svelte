<script>
	import { onMount } from 'svelte';
	export let promise
	let urlencoded = new URLSearchParams();
	let requestOptions = {
		method: 'GET'
	};

	promise = fetch(`http://127.0.0.1:3001/api/users`, requestOptions).then(
			res => res.json()
	);



</script>

<main>
	<div class="table" style="display:grid; grid-template-rows: repeat(1, 1fr)">
	{#await promise}
		loading...
	{:then apiResults}
		<div class="row">
		<div class="title">Name</div>
		<div class="title">Mail</div>
		<div class="title">pass</div>
		<div class="title">ID</div>
		<div class="title">bids</div>
		</div>
		{#each apiResults as result }
		<div class="row">
			<div class="col1">{result._name}</div>
			<div class="col2">{result._mail}</div>
			<div class="col3">{result._pass}</div>
			<div class="col4">{result._iD}</div>
			<div class="col5">{result._bids}</div>
		</div>
		{/each}

	{:catch error}
	{/await}
	</div>
</main>

<style>
	.row{
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		text-align: left;

	}
	.row >div{
		padding: 10px;
		background-color: #cc5656;
	}
	.row >div:nth-child(odd){
		background-color: #ad4848;
	}
	.title{
		font-weight: bold;
	}



</style>