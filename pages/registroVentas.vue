<template>
<div class="registro">
    <h1>Clientes</h1>
    <table class="table t.thead-light">
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
            </thead>
            <tbody>
                <tr v-for="venta,index in arrayVentaModificada">
                    <td>{{venta.numFactVeh}}</td>
                    <td>{{ venta.nombres}}</td>
                    <td>{{ venta.apellidos}}</td>
                    <td>{{ venta.telefono}}</td>
                    <td>{{new Date(venta.fechaVta).toLocaleString()}}</td>
                    <td>${{ parseInt(venta.PrecioVta).toLocaleString()}}</td>
                    <td>{{venta.cedCliente}}</td>
                    <td>{{venta.cantVta}}</td>
                    <td><img :src="venta.srcImg" alt="No se encontro" height="100" width="100"></td>
                </tr>
            </tbody>
    </table>
    <table class="table table-info ">
            <thead>
                <th>Cantidad</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th> </th>
            <th>Total</th>
            <th>Cantidad Producto</th>
            <th></th>
            </thead>
            <tbody>
                <tr>
                    <td>{{objTotal.cantidadF}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${{objTotal.totalVenta.toLocaleString()}}</td>
                    <td>{{objTotal.cantidadTotal}}</td>
                    <td></td>
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
            arrayVentaModificada: [],
            objTotal : {
                totalVenta: 0,
                cantidadF: 0,
                cantidadTotal: 0
            }
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
                        });
                        this.objTotal.cantidadF += 1;
                        this.objTotal.totalVenta += parseInt(venta.PrecioVta);
                        this.objTotal.cantidadTotal += parseInt(venta.cantVta);
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
    },
}
</script>