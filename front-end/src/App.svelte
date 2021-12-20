<!--nav bar used from https://svelte.dev/repl/451fd183e0d3403cb7800101f7d799fb?version=3.44.3-->
<script>
    import router from "page";
    //svelte pages
    import Login from "./pages/auth/Login.svelte";
    import Home from "./pages/Home.svelte";
    import Watches from "./pages/products/Products.svelte";
    import Register from "./pages/auth/Register.svelte";
    import Admin from "./pages/admin/Admin.svelte";
    import Account from "./pages/Account.svelte";


    import loggedIn from "./pages/middleware/loggedIn";
    import administrator from "./pages/middleware/administrator";
    //custom components
    import Navigation from "./components/Navigation.svelte";
    let page;
    let params;

    router('/login', (ctx) => page = Login);
    router('/register', (ctx) => page = Register);

    router('/', loggedIn, (ctx) => page = Home);
    router('/account', loggedIn, (ctx) => page = Account);
    router('/admin', loggedIn, administrator, (ctx) => page = Admin);

    router('/bids', loggedIn, (ctx) => page = Bids);
    router('/bids/:id', loggedIn, (ctx, next) => {params = ctx.params, next()}, () => page = Bids)

    router('/watches', loggedIn, (ctx) => page = Watches);
    router('/watches/:id', loggedIn, (ctx, next) => {params = ctx.params, next()},  () => page = Bids)

    router.start();
</script>
<svelte:head>
    <title>Watch Store</title>
</svelte:head>

{#if page != Login && page != Register}
<Navigation>

</Navigation>
{/if}
<svelte:component this="{page}" {params}/>
