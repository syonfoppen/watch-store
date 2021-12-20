<script>
    export let promise;
    import router from "page";
    import userStore from "../../stores/user";
    let urlencoded = new URLSearchParams();
    let requestOptions = {
        method: 'GET'
    };

    async function addBid(id){
        let amount = document.getElementById("input"+id).value;
        const response = await fetch("http://localhost:3001/api/bids", {
            method: "POST",
            body: JSON.stringify({
                "productId": id,
                "amount": amount
            }),
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + $userStore.token
            }
        });

        if (response.ok) {
            //update products
            promise = getProducts();
            return response.json();
        } else {
            alert(response.text());
            throw new Error(await response.text());
        }

    }
    async function removeBid(id, uuid){
        const response = await fetch("http://localhost:3001/api/bids/" + id + "/" + uuid, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + $userStore.token
            }
        });

        if (response.ok) {
            //update products
            promise = getProducts();
            return response.json();
        } else {
            alert(response.text());
            throw new Error(await response.text());
        }

    }
    async function getProducts(){
        const response = await fetch("http://localhost:3001/api/products", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + $userStore.token
            }
        });

        if (response.ok) {
            return response.json();
        } else {
            alert(response.text());
            throw new Error(await response.text());
        }
    }
    promise = getProducts();
    console.log(promise);
</script>

<main>
    <div class="card-container">
        {#await promise}
            <img src="/Loader.gif" alt="loading...">
        {:then apiResults}
            {#each apiResults as result }
                <div class="card">
                    <div class="brand">{result._brand}</div>
                    <div class="price">Starting price: {result._startingPrice}</div>
                    <div class="info">Diameter: {result._diameter}</div>
                    <div clas="info">Material: {result._material}</div>

                    <div class="info">{result._description}</div>
                    <div id="bid{result._iD}">
                        <h3>place bid</h3>
                        <input placeholder="Amount" id="input{result._iD}"/>
                        <button type="button" on:click={addBid(result._iD)}>add bid</button>
                        {#each result._bids.reverse() as bid}
                            <div>{bid._amount}<button on:click={removeBid(result._iD,bid._id)}>remove bid</button></div>
                        {/each}
                    </div>
                </div>
            {/each}
        {:catch error}
            error
        {/await}
    </div>
</main>

<style>
.card-container{
    display:grid;
    grid-template-columns: auto auto auto;
}
.card-container > .card{
    padding: 15px;
    margin: 40px;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
}
.brand{
font-size: 1.5em;
    font-weight: bold;
}
.info{

}
.price{

}
#biding > input{
    width:100%;
    padding:5px;
}
</style>