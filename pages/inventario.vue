<template>
    <div class="container">
        <center>
            <div class="card row w-50 p-4">
                <h1>Gestion de Productos</h1>
                <div class="mb-2 row pt-4">
                    <label class="col-sm-3 col-form-label">Nombre</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="nombre" v-model="objProducto.nombre" ref="miCarro">
                    </div>
                </div>
                <div class="mb-2 row pt-4">
                    <label  class="col-sm-3 col-form-label">Tipo</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="tipo" v-model="objProducto.tipo">
                    </div>
                </div>
                <div class="mb-2 row pt-4">
                    <label  class="col-sm-3 col-form-label">Sabores</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="sabores" v-model="objProducto.sabores">
                    </div>
                </div>
                <div class="mb-2 row pt-4">
                    <label  class="col-sm-3 col-form-label">Precio</label>
                    <div class="col-sm-9">
                        <input type="number"  class="form-control"  id="precio" v-model="objProducto.precio">
                    </div>
                </div>
                <div class="mb-2 row pt-4">
                    <label  class="col-sm-3 col-form-label">Imagen</label>
                    <div class="col-sm-9">
                        <input type="text"  class="form-control"  id="imagen" v-model="objProducto.imagen">
                    </div>
                </div>
                <div class="col-auto">

                    <button class="btn btn-success mt-3" v-if="ocultarBooton" @click="agregar()">Agregar</button>
                    <button class="btn btn-success mt-3" v-else @click="agregar()">Actualizar</button>
                </div>
            </div>
            <br>
            <h2>Listado Inventario de Helados</h2>
            <table class="table table-danger">
                <thead>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Sabores</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </thead>
                <tbody>
                    <tr v-for="producto, index in arrayobjProductoic">
                        <td>{{ producto.nombre }}</td>
                        <td>{{ producto.tipo }}</td>
                        <td>{{ producto.sabores }}</td>
                        <td><img width="100" height="100" :src="producto.imagen"></td>
                        <td>{{ new Intl.NumberFormat("de-DE").format(producto.precio) }}</td>
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
    data() {
        return {
            arrayobjProductoic: [],
            objProducto: {
                nombre: null,
                tipo: null,
                sabores: null,
                precio: null,
                imagen: null
            },
            ocultarBooton: true,
            posAct: null,
        }
    },
    mounted() {
        this.comprobarLocalStorage();
    },
    methods: {
        agregar() {
            var resultado = JSON.parse(JSON.stringify(this.objProducto))
            if (this.ocultarBooton) {
                this.arrayobjProductoic.push(resultado);
            }
            else {
                this.arrayobjProductoic[this.posAct] = resultado;
                console.log(this.arrayobjProductoic);
                this.ocultarBooton = true;
            }
            this.guardarLocal();
            this.limpiarCajas();
        },

        comprobarLocalStorage() {
            if (localStorage.getItem('arrayobjProductoic') !== undefined && localStorage.getItem('arrayobjProductoic')) {
                this.arrayobjProductoic = JSON.parse(localStorage.getItem('arrayobjProductoic'));
            }
        },
        editar(pos) {
            this.posAct = pos;
            this.ocultarBooton = false;
            this.objProducto.nombre = this.arrayobjProductoic[pos].nombre;
            this.objProducto.tipo = this.arrayobjProductoic[pos].tipo;
            this.objProducto.sabores = this.arrayobjProductoic[pos].sabores;
            this.objProducto.precio = this.arrayobjProductoic[pos].precio;
            this.objProducto.imagen = this.arrayobjProductoic[pos].imagen;
        },
        eliminar(pos) {
            this.arrayobjProductoic.splice(pos, 1);
            this.guardarLocal();
        },
        guardarLocal() {
            localStorage.setItem('arrayobjProductoic', JSON.stringify(this.arrayobjProductoic));
        },
        limpiarCajas() {
            this.objProducto.nombre = null;
            this.objProducto.tipo = null;
            this.objProducto.sabores = null;
            this.objProducto.imagen = null;
            this.objProducto.precio = 0;
            this.$refs.miCarro.focus();
        }
    },
    computed: {

    }

}
</script>