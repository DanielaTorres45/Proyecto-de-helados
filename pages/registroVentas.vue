<template>
<div class="registro">
    <h1>Clientes</h1>
    <table class="table table-danger">
            <thead>
                <th>Nº</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>teléfono</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Ced Cliente</th>
            <th>Cantidad</th>
            <th>Img</th>
            <th>Acciones</th>
            </thead>
            <tbody>
                <tr v-for="venta,index in arrayVentaModificada">
                    <td>{{venta.numFactVeh}}</td>
                    <td>{{ venta.nombres}}</td>
                    <td>{{ venta.apellidos}}</td>
                    <td>{{ venta.telefono}}</td>
                    <td>{{new Date(venta.fechaVta).toLocaleString()}}</td>
                    <td>{{venta.PrecioVta}}</td>
                    <td>{{venta.cedCliente}}</td>
                    <td>{{venta.cantVta}}</td>
                    <td><img :src="venta.srcImg" alt="No se encontro" height="100" width="100"></td>
                    <td>
                        <button class="btn btn-danger" @click="eliminar(index)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
          </table>
          
</div>
</template>
<script>
export default {
    data() {
        return {
            arrayVentas: [],
            arrayCliente: [],
            arrayVentaModificada: []
        }
    },
    methods: {
        persistHistVtasVeh(){ 

        localStorage.setItem('arrayVentasVeh',JSON.stringify(this.arrayVentas));
       },
       eliminar(index){
        this.arrayVentas.splice(index,1);
        this.persistHistVtasVeh();
        this.arrayVentas = JSON.parse(localStorage.getItem('arrayVentasVeh'));
        this.arrayVentaModificada = [ ];
        this.arrayCliente = JSON.parse(localStorage.getItem('arrayClientes')); 
        this.cargarTabla();
       },
       cargarTabla() {
        if(this.arrayCliente && this.arrayVentas){
            this.arrayVentas.forEach(venta => {
                let encontre = true;
                this.arrayCliente.forEach(cliente => {
                    if(venta.cedCliente == cliente.cedula && encontre) {
                        encontre = false;
                        this.arrayVentaModificada.push({
                            ...venta,
                            ...cliente,
                        })
                    }
                })
            }); 
        }
       }
    },
    mounted() {
        this.arrayVentas = JSON.parse(localStorage.getItem('arrayVentasVeh'));
        this.arrayCliente = JSON.parse(localStorage.getItem('arrayClientes')); 
        this.cargarTabla();
    }
}
</script>