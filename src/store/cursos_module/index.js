import axios from 'axios';
const datos_cursos = {
    namespaced:true,
    state:{
        datos:[],
        datos_tabla:[],
        curso_editar_card:{},
        curso_editar_tabla:{},
        
    },
    getters:{
        consultarNoCompletados:(state)=>{
            let nuevoArray = state.datos.filter(curso => curso.completado === false);
            return nuevoArray;
        },
        
    },
    mutations:{
        CONSULTAR_CURSOS:(state, unoscursos)=>{
            state.datos = unoscursos;
        },
        ASIGNAR_CURSOS_NO_COMPLETADOS: (state, nocompletados)=>{
            state.cursos_no_completados = nocompletados;
        },
        CONSULTAR_DATOS_TABLA:(state, datosprocesados)=>{
            state.datos_tabla = datosprocesados;
        },
        ELIMINAR_CURSO:(state, unid)=>{
            let elindice = state.datos_tabla.findIndex(registro => registro.id == unid);
            state.datos_tabla.splice(elindice, 1);
        },
        REGISTRAR_DATOS_CARDS:(state, curso)=>{
            state.datos.push(curso);
        },
        REGISTRAR_DATOS_TABLA:(state, curso)=>{
            state.datos_tabla.push(curso);
        },
        CONSULTAR_CURSOS_EDITAR_CARD:(state, id)=>{
            let elindice =  state.datos.findIndex(registro => registro.id == id);
            state.curso_editar_card = state.datos[elindice];
        },
        CONSULTAR_CURSOS_EDITAR_TABLA:(state, id)=>{
            console.log('CONSULTAR_CURSOS_EDITAR_TABLA', id);
            let elindice =  state.datos_tabla.findIndex(registro => registro.id == id);
            console.log('indice CONSULTAR_CURSOS_EDITAR_TABLA', elindice)
            state.curso_editar_tabla = state.datos_tabla[elindice];
        },
        EDITAR_DATOS_CARD:(state,objetoregistro)=>{
            console.log('EDITAR_DATOS_CARD', objetoregistro);
            let elindice =  state.datos.findIndex(registro => registro.id == objetoregistro.id);
            state.datos.splice(elindice,1,objetoregistro);
        },
        EDITAR_DATOS_TABLA:(state,objetoregistro)=>{
            console.log('EDITAR_DATOS_TABLA', objetoregistro);
            let elindice =  state.datos_tabla.findIndex(registro => registro.id == objetoregistro.id);
            state.datos_tabla.splice(elindice,1,objetoregistro);
        },
    },
    actions:{
        consultarCursos:(context)=>{
            console.log('LLAMADO A CONSULTAR CURSOS');
            // si el json lo tenemos guardado en la carpeta publica
            let url = "datoscursos.json";
            axios.get(url)
                .then(respuesta=>{
                                console.log(respuesta.data);
                    console.log(respuesta.data.cursos);
                    context.commit('CONSULTAR_CURSOS', respuesta.data.cursos);
                })
                .catch(err=>{
                    console.log(err);
                });
        },
        consultarDatosTabla:(context)=>{
            console.log('LLAMADO A CONSULTAR DATOS TABLA');
            let url = "datoscursos.json";
            axios.get(url)
                .then(respuesta=>{
                    let longitud = respuesta.data.cursos.length;
                    let nuevoArreglo = [];
                    for(let i=0; i < longitud ; i ++){
                        let registro = {};

                        registro.id = respuesta.data.cursos[i].id;
                        registro.curso = respuesta.data.cursos[i].nombre;
                        registro.cupos = respuesta.data.cursos[i].cupos;
                        registro.inscritos = respuesta.data.cursos[i].inscritos;
                        registro.duracion = respuesta.data.cursos[i].duracion;
                        registro.costo = respuesta.data.cursos[i].costo;
                        registro.terminado = respuesta.data.cursos[i].completado;
                        registro.fecha = respuesta.data.cursos[i].fecha_registro;
                        registro.acciones = '';

                        nuevoArreglo.push(registro);
                    };
                    context.commit('CONSULTAR_DATOS_TABLA', nuevoArreglo);


                })
                .catch(err=>{
                    console.log(err);
                });
        },
        consultarCursosEditarCard:(context, id)=>{
            context.commit('CONSULTAR_CURSOS_EDITAR_CARD', id);
        },
        consultarCursosEditarTabla:(context, id)=>{
            console.log('consultarCursosEditar', id);
            context.commit('CONSULTAR_CURSOS_EDITAR_TABLA', id);
        },
        editarDatosCard:(context, objetoregistro)=>{
            context.commit('EDITAR_DATOS_CARD',objetoregistro);
        },
        editarDatosTabla:(context, objetoregistro)=>{
            console.log('editarDatosTabla objetoRegistro', objetoregistro);
            context.commit('EDITAR_DATOS_TABLA',objetoregistro);
        },
        eliminarCurso:(context, id)=>{
            context.commit('ELIMINAR_CURSO', id);
        },
        registrarDatosCards:(context,nuevocurso)=>{
            context.commit('REGISTRAR_DATOS_CARDS', nuevocurso);
        },
        registrarDatosTabla:(context,nuevocurso)=>{
            context.commit('REGISTRAR_DATOS_TABLA', nuevocurso);
        },
    },
    modules:{}
};

export default datos_cursos;