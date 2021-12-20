
<script>
    import { useForm, validators, HintGroup, Hint, required } from "svelte-use-form";
    import router from "page";
    const form = useForm();
    let username = "";
    let password = "";
    async function register() {
        const response = await fetch("http://localhost:3001/api/users", {
            method: "POST",
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: {
                "Content-type": "application/json"
            }
        });

        if (response.ok) {
            alert('registered');
            router.redirect("/login");
        } else {
            throw new Error(await response.text());
        }
    }
</script>
<div class="login-container">
    <h1>Sneaker Auction</h1>
    <form use:form>
        <h3>Register</h3>
        <div>
            <input type="text" name="username" placeholder="username" use:validators={[required]} bind:value={username}/>
            <HintGroup for="email">
                <Hint on="required">This is a mandatory field</Hint>
                <Hint on="email" hideWhenRequired>Email is not valid</Hint>
            </HintGroup>
        </div>
        <div>
            <input type="password" name="password" placeholder="password" use:validators={[required]} bind:value={password} />
            <Hint for="password" on="required">This is a mandatory field</Hint>
        </div>
        <button disabled={!$form.valid} on:click|preventDefault={register}>Register</button>
        <!-- svelte-ignore a11y-missing-attribute -->
        <p>if you have an account, you can <a on:click={() => router.redirect("/login")}>login</a> here</p>

    </form>
</div>