<template>
    <div>
      <center>
        <div class="card row w-50 p-4">
                <h1>Gestion Datos Clientes</h1>
                <div class="mb-2 row pt-4">
                    <label class="col-sm-3 col-form-label">Cedula</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="cedula" v-model="objCliente.cedula" ref="cliente">
                    </div>
            </div>
            <div class="mb-2 row pt-4">
                    <label class="col-sm-3 col-form-label">Nombre</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="nombre" v-model="objCliente.nombres" ref="cliente">
                    </div>
            </div>
            <div class="mb-2 row pt-4">
                    <label class="col-sm-3 col-form-label">Apellidos</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="apellidos" v-model="objCliente.apellidos" ref="cliente">
                    </div>
            </div>
            <div class="mb-2 row pt-4">
                    <label class="col-sm-3 col-form-label">Direccion</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="direccion" v-model="objCliente.direccion" ref="cliente">
                    </div>
            </div>
            <div class="mb-2 row pt-4">
                    <label class="col-sm-3 col-form-label">Telefono</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="telefono" v-model="objCliente.telefono" ref="cliente">
                    </div>
            </div>
            <div class="col-auto">
              <button class="btn btn-success"  v-if="ocultarBooton"   @click="agregar()">Agregar</button>
              <button class="btn btn-success"  v-else  @click="agregar()">Actualizar</button>
            </div>
        </div>
          
          <br>
          <h2>Listado de Clientes</h2>
          <table class="table table-danger">
                <thead>
                  <th scope="col">Cedula</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Acciones</th>
                </thead>
            <tbody>
                <tr v-for="objCliente,index in arrayClientes">
                    <td>{{objCliente.cedula}}</td>
                    <td>{{objCliente.nombres}}</td>
                    <td>{{objCliente.apellidos}}</td>
                    <td>{{objCliente.direccion}}</td>
                    <td>{{objCliente.telefono}}</td>
                    <td>
                        <button class="btn btn-info" @click="editar(index)">Editar</button>
                        <button class="btn btn-danger" @click="eliminar(index)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
          </table>
      </center>
      
    </div>
    
  </template>
  
  <script>
  export default {
    name: 'IndexPage',
    data(){
        return{
            arrayClientes:[],
            objCliente: {
                cedula: null,
                nombres: null,
                apellidos: null,
                direccion: null,
                telefono: null,
              },
            ocultarBooton:true,
            posAct:null,
        }
    },
    mounted(){
        this.comprobarLocalStorage();
    },
    methods:{
        agregar(){
            var resultado=JSON.parse(JSON.stringify(this.objCliente))
           if(this.ocultarBooton){
            this.arrayClientes.push(resultado);
           }
           else{
            this.arrayClientes[this.posAct]=resultado;
            this.ocultarBooton=true;
           }
           this.guardarLocal();
           this.limpiarCajas();
        },
        comprobarLocalStorage(){
        if(localStorage.getItem('arrayClientes') !== undefined && localStorage.getItem('arrayClientes')){
          this.arrayClientes= JSON.parse(localStorage.getItem('arrayClientes'));
        }
      },
      editar(pos){
        this.posAct=pos;
        this.ocultarBooton=false;
        this.objCliente.cedula=this.arrayClientes[pos].cedula;
        this.objCliente.nombres=this.arrayClientes[pos].nombres;
        this.objCliente.apellidos=this.arrayClientes[pos].apellidos;
        this.objCliente.direccion=this.arrayClientes[pos].direccion;
        this.objCliente.telefono=this.arrayClientes[pos].telefono;
      },
      eliminar(pos){
        this.arrayClientes.splice(pos,1);
        this.guardarLocal();
      },
      guardarLocal(){
        localStorage.setItem('arrayClientes',JSON.stringify(this.arrayClientes));
      },
      limpiarCajas(){
        this.objCliente.cedula=null;
        this.objCliente.nombres=null;
        this.objCliente.apellidos=null;
        this.objCliente.direccion=null;
        this.objCliente.telefono=null;
        this.$refs.cliente.focus();
      }
    },
}
  </script>