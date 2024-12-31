<script>
    export let form;
</script>

<h1>Hello !</h1>
<form class="auth-form" method="post" action="?/OAuth2">
    <button class="btn-auth" type="submit">
        <img
            class="btn-auth-img"
            src="/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png"
            alt="google sign in"
        />
    </button>
</form>

<style>
    button {
        width: 100%;
        background-color: #fff;
        transition: all 0.3s ease-in;
    }
    button:hover {
        cursor: pointer;
        text-decoration: underline;
        color: #fff;
        background-color: #4d4c4c;
        transition: all 0.3s ease-in;
    }

    .btn-auth-img:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    .btn-auth {
        border: 0;
        background-color: rgba(84, 81, 81, 0);
        padding: 0.01em;
    }
    .btn-auth:hover {
        border: 0;
        padding: 0.01em;
        text-decoration: none;
        background-color: rgba(84, 81, 81, 0);
    }
    .auth-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .sign-in-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
</style>
