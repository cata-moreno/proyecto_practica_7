<template>
    <div id="TotalesComponent">
    <h1>Totales Component</h1>

    <div id="totalAlumnos">
        <p >Cantidad total de Alumnos permitidos: {{ totalCupos }} alumnos</p>
    </div>
        
        <p id="totalInscritos">Cantidad total de Alumnos inscritos:  {{ totalInscritos }} alumnos</p>
        <p id="totalRestantes">Cantidad total de Cupos Restantes:  {{ totalRestantes }} cupos</p>
        <p id="totalTerminados">Cantidad total de Cursos Terminados:  {{ totalTerminados }} cursos</p>
        <p id="totalActivos">Cantidad total de Cursos Activos:  {{ totalActivos }} cursos</p>
        <p id="totalCursos">Cantidad total de Cursos:  {{ totalCursos }} cursos</p>
    </div>        
  </template>
  
  <script>
  import { mapState,mapActions } from 'vuex';
  export default {
    name: 'TotalesComponent',
    props: {
    },
    data:function(){
      return{
      }
    },
    methods:{
      ...mapActions('datos_cursos',['consultarDatosTabla']),
    },
    computed:{
      ...mapState('datos_cursos',['datos_tabla']),
      totalCupos: function(){
        let valorInicial =0;
        let total = this.datos_tabla.reduce( (acumulador, registro) => acumulador + registro.cupos, valorInicial);
        return total;
      },
      totalInscritos: function(){
        let valorInicial =0;
        let total = this.datos_tabla.reduce( (acumulador, registro) => acumulador + registro.inscritos, valorInicial);
        return total;
      },
      totalRestantes: function(){
        let valorInicial =0;
        let totalCupos = this.datos_tabla.reduce( (acumulador, registro) => acumulador + registro.cupos, valorInicial);
        let totalInscritos = this.datos_tabla.reduce( (acumulador, registro) => acumulador + registro.inscritos, valorInicial);
        let diferencia = totalCupos - totalInscritos;
        return diferencia;
      },
      totalTerminados: function(){
        let valorInicial =0;
        let totalTerminados = 0;

            totalTerminados = this.datos_tabla.reduce( (acumulador, registro) => {
                if(registro.terminado == true)
                {
                    acumulador++;
                }
                return acumulador;
            } , valorInicial);
            return totalTerminados;
      },
      totalActivos: function(){
        let valorInicial =0;
        let totalActivos = 0;


        let longitud = this.datos_tabla.length;
        for(let i=0; i < longitud ; i++){
            if(this.datos_tabla[i].terminado == false){
                totalActivos++;
            }
        }
      
            return totalActivos;
      },
      totalCursos: function(){

        let totalC = this.datos_tabla.length;
            return totalC;
      },


    },
    watch:{},
    created(){
    }
  }
  </script>
  
  <style scoped>
  #TotalesComponent{
    background-color: #98FB98;
    margin: 4%;
  }

  #totalAlumnos{
    color:#4169E1;
    font-weight: bolder;
    border: 2px solid #4169E1;
  }

  #totalInscritos{
    color:#FFF5EE;
    font-weight: bolder;
  }

  #totalRestantes{
    color:#FFA500;
    font-weight: bolder;
  }

  #totalTerminados{
    color: #BA55D3;
    font-weight: bolder;
  }

  #totalActivos{
    color: #008000;
    font-weight: bolder;
  }

  #totalCursos{
    color: #6A5ACD;
    font-weight: bolder;
  }
  </style>
  