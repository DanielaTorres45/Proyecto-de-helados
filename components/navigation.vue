<template>
  <div>
    <section id="main_container">
        <header class="header">
            <nav class="top_menu">
                <ul>
                  <li><nuxt-link to="/">Inicio</nuxt-link></li>
                  <li><nuxt-link :to="{name:'inventario'}">Inventario</nuxt-link></li>
                  <li><nuxt-link :to="{name:'clientes'}">Datos clientes</nuxt-link></li>
                  <li><nuxt-link :to="{name:'vender'}">Vender</nuxt-link></li>
                  <li><nuxt-link :to="{name:'registroVentas'}">Registro Ventas</nuxt-link></li> 
                </ul>
            </nav>
          
        </header>
        <div id="d2">
                <label>Heladeria Dulce Placer</label>
        </div>
      </section>
  </div>
    
</template>
<style>
#d2{
    text-align: center;
    padding: 15px;
    font-size: 40px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
.header{
        background: #e0e0e0;
        color: #181818;
        justify-content: space-between;
        padding: 1rem 3rem;
        border-bottom: 1px solid #ffffff;
        border-radius: 5px;
      
       
    }
    .header ul{
        display: flex;
        list-style: none;
        align-items: center;
        margin-left: 250px;
         
        
        
    }
    .header a{
        color: #ffffff;
        background: #707070;
        padding: .3rem 1rem;
        margin-right: .5rem;
        text-decoration:none;
        text-transform: uppercase;
        border-radius: 5px;
  
        
    }
    .header a:hover{
        background: #dfdfdf;
        border-bottom: 1px solid #bdc3c7;
        border-radius: 10px;
        display: inline-block; 

    }
</style>