<template>
    <div>
      <div id="d1">
        <button @click="habilitarDiv()">
            <img width="50" height="34" src="../static/carrito.png">
      </button>
      </div>
      <table class="table1"  v-for="objProducto, index in arrayobjProductoic">
        <tbody>
          <tr>
          <td>
            <button @click="agregarCarrito(index)" data-tooltip="Click Enviar a Carrito">
              <figure>
                <img 
                  width="100"
                  height="100"
                  :src="objProducto.imagen"
                  >
                <figcaption>
                  Nombre: {{ objProducto.nombre }} <br>
                  Tipo: {{ objProducto.tipo}} <br>
                  Sabores: {{ objProducto.sabores }} <br>
                  Valor: {{new Intl.NumberFormat("de-DE").format( objProducto.precio) }}
                </figcaption>
              </figure>
            </button> 
          </td>
        </tr>
        </tbody>
      </table>
      <br>
      <div v-show="ocultarDiv">
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
                        <input type="text"  class="form-control"  id="nombre" v-model="objCliente.nombre" ref="cliente">
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
              <button class="btn btn-success" @click="agregarClientes()">Agregar</button>
            </div>
        </div>
        </center>
      </div>
      <div v-show="ocultarCar">
        <center>
          Nombre Cliente:  {{ objCliente.nombres }} {{ objCliente.apellidos }}
          <h2>Listados  Compras</h2>
          <hr noshade="noshade" size="3" color="blue" width="45%">
          <br>
          <table class="table table-danger">
                <thead>
                  <th scope="col">Nombre</th>
                <th scope="col">Fecha Venta</th>
                <th scope="col">Cantidad Vendida</th>
                <th scope="col">Precio Venta</th>
                <th scope="col">Fuente Imagen</th>
                <th scope="col">Acciones</th>
                </thead>
                <tbody>
                    <tr v-for="objCar, index in arrayCarritoVeh">
                        <td>{{objCar.nombre}}</td>
                        <td>{{ new Date(objCar.fechaVta).toLocaleString()}}</td>
                        <td>{{objCar.cantVta}}</td>
                        <td>{{new Intl.NumberFormat("de-DE").format(objCar.PrecioVta)}}</td>
                        <td>
                            <img :src="objCar.srcImg" alt="No se encontro" height="100" width="100">
                        </td>
                        <td>
                            <button class="btn btn-danger" @click="eliminar(index)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="m-2 row w-50">
              <div class="col-4">
                <button class="btn btn-info" disabled>Total Ventas: {{new Intl.NumberFormat("de-DE").format(totalVenta)}} </button>
              </div>
              <div class="col-4">
                <button class="btn btn-success"   @click="confirmarCompra()">Confirmar Compra</button>
              </div>
              <div class="col-4">
                <button class="btn btn-danger"  @click="cancelarCompra()">Cancelar compra</button>
              </div>
            </div>
        </center>
      </div>
    </div>
</template>
  <style>
    
  #d1 {
    position: absolute;
    right: 20px;
  }
   button{
       cursor: pointer;
       background-color: transparent;
       /* border: none; */
   }
   button:hover::after{
       content: attr(data-tooltip);
   }
  </style>
  <script>
  export default {
    name: 'IndexPage',
    data(){
        return{
            arrayClientes:[],
            arrayobjProductoic:[],
            arrayCarritoVeh:[],
            arrayVentasVeh:[],
            objProducto:{
                nombre:null,
                tipo:null,
                sabores:null,
                imagen:null,
                precio:null,
            },
            objcarrito:{
                numFactVeh:null,
                fechaVta:null,
                PrecioVta:null,
                cedCliente:null,
                cantVta:null,
                srcImg:null,
            },
            objCliente: {
                cedula: null,
                nombres: null,
                apellidos: null,
                direccion: null,
                telefono: null,
              },
        posAct:null,
        fulldatetime: '',
        ocultarDiv:false,
        ocultarCar:false,
        pos:null,
        cedComprador:null,
        numFactVeh:null,
        clienteReg:false,
        }
    },
    mounted(){
        this.comprobarLocalStorage();
      
        if(localStorage.getItem('arrayCarritoVeh')){
            this.arrayCarritoVeh =  JSON.parse(localStorage.getItem('arrayCarritoVeh'));
            //console.log(localStorage.getItem('arrayCarritoVeh'));
        }
        if(localStorage.getItem('arrayVentasVeh') !== "undefined"){
          this.arrayVentasVeh =  JSON.parse(localStorage.getItem('arrayVentasVeh'));
          // console.log(localStorage.getItem('arrayVentasVeh'));
        }
        if(localStorage.getItem('numFactVeh')){
            this.numFactVeh =  JSON.parse(localStorage.getItem('numFactVeh'));
            this.numFactVeh+=1;
            //console.log(localStorage.getItem('numFactVeh'));
        }
        else{
            this.numFactVeh=0;
            localStorage.setItem('numFactVeh', JSON.stringify(this.numFactVeh))
        }
       this.verificarLocalClientes();
        this.fulldatetime = this.printFullDate();
    },
    methods:{
        comprobarLocalStorage(){
        if(localStorage.getItem('arrayobjProductoic') !== undefined && localStorage.getItem('arrayobjProductoic')){
          this.arrayobjProductoic= JSON.parse(localStorage.getItem('arrayobjProductoic'));
        }
      },
      verificarLocalClientes(){
        if (localStorage.getItem('arrayClientes')) {
          this.arrayClientes = JSON.parse(localStorage.getItem('arrayClientes'));
        }
      },
      verificarCedComprador(){
        if(localStorage.getItem('cedComprador')){
            this.cedComprador =  localStorage.getItem('cedComprador');
        }
      },
      agregarCarrito(index){
        this.objcarrito.numFactVeh=this.numFactVeh;
        this.objcarrito.nombre=this.arrayobjProductoic[index].nombre;
        this.objcarrito.fechaVta=this.fulldatetime;
        this.objcarrito.PrecioVta=this.arrayobjProductoic[index].precio;
        this.objcarrito.cantVta=1;
        this.objcarrito.srcImg=this.arrayobjProductoic[index].imagen;
        let resultado=JSON.parse(JSON.stringify(this.objcarrito));
        this.arrayCarritoVeh.push(resultado);
        this.guardarLocalCarrito();
      },
      habilitarDiv(){
          this.ocultarDiv=true;
      },
      agregarClientes(){
        this.cedComprador=this.objCliente.cedula;
        var resultado=JSON.parse(JSON.stringify(this.objCliente));
        this.arrayClientes.push(resultado);
        this.ocultarDiv=false;
        this.guardarLocalCliente();
        this.actulizarCedComp(this.cedComprador);
        this.ocultarCar=true;
        this.persistCedComp();
      },
      actulizarCedComp(cedComprador){
        for(let i in this.arrayCarritoVeh){
          this.arrayCarritoVeh[i].cedCliente=cedComprador;
        }   
      },
      guardarLocalCliente(){
        localStorage.setItem('arrayClientes',JSON.stringify(this.arrayClientes));
      },
      guardarLocalCarrito(){
        localStorage.setItem('arrayCarritoVeh',JSON.stringify(this.arrayCarritoVeh));
      },
      persistCedComp(){
        localStorage.setItem('cedComprador', JSON.stringify(this.cedComprador))
       },
       persistHistVtasVeh(){
        localStorage.setItem('arrayVentasVeh',JSON.stringify(this.arrayVentasVeh));
       },
       persistArrayVeh(){
        localStorage.setItem('arrayobjProductoic',JSON.stringify(this.arrayobjProductoic));
       },
       persisNumFactVeh(){
        localStorage.setItem('numFactVeh',JSON.stringify(this.numFactVeh));
       },
       eliminar(index){
         this.arrayCarritoVeh.splice(index,1)
         this.guardarLocalCarrito();
       },
       printFullDate: function(){
        return new Date();
      },
      confirmarCompra(){
        if(!Array.isArray(this.arrayVentasVeh)) {this.arrayVentasVeh = [];}
        for( let i in this.arrayCarritoVeh){
              this.arrayVentasVeh.push(this.arrayCarritoVeh[i]);
            }
            this.arrayCarritoVeh=[];
            this.guardarLocalCarrito();
            this.persistHistVtasVeh();
             this.persistArrayVeh();
            this.persisNumFactVeh();
            this.objCliente.cedula= null;
            this.objCliente.nombres= null;
            this.objCliente.apellidos= null;
            this.objCliente.direccion= null;
            this.objCliente.telefono= null;
            this.ocultarCar=false;
            this.$router.push('/registroVentas');
      },
      cancelarCompra(){
        this.arrayCarritoVeh=[];
        this.arrayClientes.pop();
        this.guardarLocalCarrito();
        this.guardarLocalCliente();
        this.objCliente.cedula= null;
        this.objCliente.nombres= null;
        this.objCliente.apellidos= null;
        this.objCliente.direccion= null;
        this.objCliente.telefono= null;
        this.ocultarCar=false;
      },
       
    },
    computed:{
      totalVenta:function(){
        let sumvta=0;
        for(let i in this.arrayCarritoVeh){
        sumvta+=parseFloat(this.arrayCarritoVeh[i].PrecioVta);
        }
        return sumvta;   
      },
    }
  }
  </script>