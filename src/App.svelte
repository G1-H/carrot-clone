<script>
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import NoutFound from "./pages/NoutFound.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import Loading from "./pages/Loading.svelte";
  import Router from "svelte-spa-router";
  import "./css/style.css";
  import Update from "./pages/Update.svelte";
  import {
    GoogleAuthProvider,
    signInWithCredential,
    getAuth,
  } from "firebase/auth";
  import { user$ } from "./store";
  import { onMount } from "svelte";
  import MyPage from "./pages/MyPage.svelte";

  let isLoading = true;

  const auth = getAuth();
  const checkLogin = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) return (isLoading = false);

    const credential = GoogleAuthProvider.credential(null, token);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;
    user$.set(user);
    isLoading = false;
  };

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const routes = {
    "/": Main,
    "/signup": Signup,
    "/write": Write,
    "/update/:index": Update,
    "/my": MyPage,
    "*": NoutFound,
  };

  onMount(() => checkLogin());
</script>

{#if isLoading}
  <Loading />
{:else if !$user$}
  <Login />
{:else}
  <Router {routes} />
{/if}
<main />

<style>
</style>
