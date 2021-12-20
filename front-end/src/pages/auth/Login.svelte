<!-- Grabbed & modified: https://svelte.dev/repl/ca967b45a5aa47b2bb2f9118eb79eefe?version=3.43.1 -->
<script>
    import router from "page";
    //dependencies
    import { useForm, validators, HintGroup, Hint, required } from "svelte-use-form";
    import jwt_decode from "jwt-decode";
    //storage
    import userStore from "../../stores/user";

    //variables
    const form = useForm();

    let username = "";
    let password = "";
    //functions
    async function login() {
        const response = await fetch("http://localhost:3001/api/credentials", {
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
            const token = (await response.json()).token;
            $userStore.token = token;
            let decodedToken = jwt_decode(token);
            $userStore.uuid = decodedToken.uuid;
            if (decodedToken.roles.includes("admin")) {
                $userStore.isAdmin = true;
            }
            alert("You logged in");
            router.redirect("/");
        } else {
            throw new Error(await response.text());
        }
    }
</script>
<!-- svelte-ignore a11y-missing-attribute -->
<div class="login-container">
    <h1>Watch Store</h1>
    <form use:form>
        <h3>Login</h3>
        <div>
            <input type="text" name="username" placeholder="username" use:validators={[required]} bind:value={username} />
            <HintGroup for="email">
                <Hint on="required">This is an mandatory field</Hint>
                <Hint on="email" hideWhenRequired>Email is not valid</Hint>
            </HintGroup>
        </div>
        <div>
            <input type="password" name="password" placeholder="password" use:validators={[required]} bind:value={password} />
            <Hint for="password" on="required">This is an mandatory field</Hint>
        </div>

        <button on:click|preventDefault={login}>Login</button>

        <p>if you dont have an account, <a on:click={() => router.redirect("/register")}>register</a> here</p>
    </form>
</div>
<style>
    .login-container{

    }
</style>

