<script>
    import router from "page";
    import userStore from "../stores/user";

    function signOut() {
        $userStore.token = undefined;
        $userStore.uuid = undefined;
        $userStore.isAdmin = false;
        alert('You have logged out');

        router.redirect("/login");
    }
</script>

<nav class="navbar">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click={() => router.redirect("/")}>Home</a>
    <a on:click={() => router.redirect("/watches")}>Watches</a>
    {#if $userStore.token}
        <a on:click={() => router.redirect("/account")}>Account</a>
        <div class="right">
            {#if $userStore.isAdmin}
                <a on:click={() => router.redirect("/admin")}>Admin</a>
            {/if}
            <a on:click={signOut}>Sign out</a>
        </div>
    {:else}
        <a on:click={() => router.redirect("/Account")}>Account</a>
    {/if}
</nav>
<style>
    .navbar{
        background-color: rgb(75, 72, 72);
        padding: 10px;
    }
    .navbar > a{
        margin-right: 10px;
        color: rgb(255, 255, 255);
    }
    .navbar > .right{
        float:right;
    }
    .navbar > .right > a{
        color: rgb(255, 255, 255);
    }
</style>