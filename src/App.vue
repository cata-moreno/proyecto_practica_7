<template>
  <div id="app">

    <!-- BARRA DE NAVEGACION-->
<div>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav  id="barranav">
        <b-navbar-brand href="#"> <router-link to="/">Home</router-link> </b-navbar-brand>
        <b-navbar-brand href="#"> <router-link to="/administracion">Administracion</router-link> </b-navbar-brand>
        <b-navbar-brand href="#"> <router-link to="/about">About</router-link> </b-navbar-brand>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
<!-- FIN BARRA DE NAVEGACION-->



    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default{
  name: 'app',
  data:function(){
    return{

    }
  },
  props:{},
  components:{},
  methods:{
    ...mapActions('datos_cursos',['consultarCursos', 'consultarDatosTabla']),
  },
  computed:{},
  watch:{},
  beforeMount(){
    this.consultarCursos();
    this.consultarDatosTabla();
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 1%;
}

#barranav {
  padding-left: 2%;
}
nav {
  padding: 30px;
}

nav a {
  color: #FAF0E6;
}

nav a.router-link-exact-active {
  color: #90EE90;
}
</style>