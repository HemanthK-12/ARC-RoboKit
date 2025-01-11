<script>
    let active = 'home';
</script>
<nav>
    <div class="navbar">
        <a href="/home" class:active={active === 'home'} on:click={() => active = 'home'}>Home</a>
        <a href="/cart" class:active={active === 'cart'} on:click={() => active = 'cart'}>Cart</a>
        <a href="/profile" class:active={active === 'profile'} on:click={() => active = 'profile'}>Profile</a>
    </div>
</nav>
    <style>
        .navbar {
            background-color: #333;
            overflow: hidden;
            position: fixed;
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: center;
        }
    
        .navbar a {
            flex: 1;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 17px;
            transition: background-color 0.3s, color 0.3s;
        }
    
        .navbar a:hover {
            background-color: #ddd;
            color: black;
        }
    
        .navbar a.active {
            background-color: #04AA6D;
            color: white;
        }
    </style>
