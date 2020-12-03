<template>
<div id="app">
  <div class="header">
    <div class="container jumbotron title">
      <router-link to="/">
        <h1 class="centered title">Olympian Hall of Fame</h1>
      </router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="row">
    <li class="col-sm-3"><a href="http://github.com">GitHub Repository</a></li>
    <div class="col-sm-5"></div>
    <div class="col-sm-2">
      <router-link to="/admin">
        <h2 class="title">Edit Roster</h2>
      </router-link>
    </div>
  </div>
</div>
</template>

<style>
body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background-image: url("../public/Olympic_Rings.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

a:hover{
  text-decoration: none;
}

.centered{
  text-align: center;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}
</style>
