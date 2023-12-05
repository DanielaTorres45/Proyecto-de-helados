<template>
  <div>
   
    <center>
      <h1>Primera App Nuxt</h1>
      <h2>{{ mensaje }}</h2>
      <br>
      <li v-for="dia in diaSemana">{{ dia }}</li>
      <hr>
      <br>
      <table border="3">
        <th>Nombre</th>
        <th>Nota</th>
        <tbody>
          <tr v-for="est in personas">
            <td>{{ est.nombre }}</td>
            <td>{{ est.nota }}</td>
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
      mensaje:"Hoy es Jueves Segundo Dias con Nuxt.js",
      diaSemana:['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
      personas:[
      {"nombre":"pedro Rojas", "nota":3.5},
      {"nombre":"Diana Montealegre", "nota":4.3},
      {"nombre":"Juana de Arco", "nota":3.3},
      {"nombre":"Simon Bolivar", "nota":4.5},
      {"nombre":"Sonia Jaramillo", "nota":3.8},
      ]
    }
  }
}
</script>
