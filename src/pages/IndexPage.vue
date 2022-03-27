<!--Usamos unicamente selectores que Quasar UI Framewokr nos provee-->
<template>
  <q-page class="flex-block p-s">
    <q-card class="my-card bg-primary text-white">
      <q-card-section>
        <q-card class="my-card bg-white text-primary">
          <div class="q-pa-md">
            <!--Usamos el componente q-table que Quasar UI Framewokr nos provee
                props usados:
                loading  = en base a la varibale booleana que recibe podemos representar el estado en carga del componente
                rows     = son los items a representar en la tabla estos se deben enviar como arreglo
                columns  = son los nombres, estilos, funcionalidades que agregaremos a las columnas de la tabla
                filter   = es una funcionalidad de q-table que nos permite filtrar el contenido de la tabla por medio del valor de una variable
                bordered = para representar un borde en el componente q-table
            -->
            <q-table
              class="my-custome-table"
              title="Registro de Films"
              :loading="loading"
              :rows="films"
              :columns="columns"
              :filter="filter"
              row-key="name"
              bordered>

              <!-- con el uso de este template manipulamos el como se representan las columnas y headers en nuestro componente q-table -->
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    style="font-size: 1rem"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <!--
                   con el uso del siguiente template manipulamos el como se representa el contenido en nuestro componente q-table aqui
                   aniadimos la particularidad de si el elemento se encuentra en la columna 'Imagen' este se debe representar como
                   imagen y nos apoyamos del uso del componente q-avatar para representarlo en una especie de circulo desde el cual
                   definimos las dimensiones del mismo
              -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <span v-if="col.name !=='Imagen'" style="font-size: 1rem">{{ col.value }}</span>
                    <q-avatar v-if="col.name ==='Imagen'" size="150px" class="shadow-10">
                      <img alt="{{props.row.Imagen}}" :src="props.row.Imagen">
                    </q-avatar>
                  </q-td>
                </q-tr>
              </template>

              <!--
                   con el uso del siguiente template agregamos el buscador y el boton de recarga en
                   la parte superior del lado derecho, cabe resaltar que en el buscador se usa el
                   v-model filter el mismo que indicamos en el prop filter del q-table
              -->
              <template v-slot:top-right>
                <q-input outlined dense debounce="300" v-model="filter" placeholder="Busqueda" style="padding-right: 1rem">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn color="primary" icon="autorenew" label="Recargar" @click="reload"/>
              </template>

              <!--
                   con el uso del siguiente template agregamos un texto personalizado en caso de no
                   encontrar un resultado para la tabla.
              -->
              <template v-slot:no-data="{ icon, filter }">
                <div class="full-width row flex-center text-red q-gutter-sm">
                  <q-icon size="2em" name="sentiment_dissatisfied" />
                  <span>No hemos podido encontrar ningun resultado</span>
                  <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                </div>
              </template>
            </q-table>
          </div>
        </q-card>
      </q-card-section>
    </q-card>


  </q-page>
</template>


<script>
import { defineComponent, onMounted, ref } from "vue";
import * as Api from "../boot/axios";

export default defineComponent({
  name: "IndexPage",
  setup() {
    let loading = ref(false);
    let filter = ref("");
    let films = ref([]);
    const columns = [
      { name: "Imagen", align: "center", label: "Imagen", field: "Imagen" },
      { name: "Titulo", align: "center", label: "Titulo", field: "Titulo", sortable: true },
      { name: "Director", align: "center", label: "Director", field: "Director", sortable: true },
      { name: "Año", align: "center", label: "Año", field: "Anio", sortable: true },
      {
        name: "Puntaje",
        align: "center",
        label: "Puntaje",
        field: "Puntaje",
        sortable: true,
        sort: (a, b) => parseInt(a) - parseInt(b)
      }
    ];

    //funcion para recargar contenido limpia la variable filtro y llama a la funcion que invoca el servicio get
    const reload = () => {
      filter.value ='';
      getFilms();
    }

    //funcion para invocar el servicio get a /films habilitamos la variable loading para indicarle a la tabla que
    //se muestre como si estuviera cargando data
    const getFilms = async () => {
      loading.value = true;
      await Api.get("/films")
        .then((response) => {
          films.value = response.data.map((value) => {
            return {
              Imagen: value.image,
              Titulo: value.title,
              Director: value.director,
              Anio: value.release_date,
              Puntaje: value.rt_score
            };
          });
        })
        .catch((err) => {
          console.warn("Api /films endpoint error: " + err);
        });
      loading.value = false;

    };

    //Usamos el estado Mounted para llamar al servicio get y cargar data a la variable correspondiente
    onMounted(async () => {
      await getFilms();
    });

    return {
      reload,
      getFilms,
      loading,
      filter,
      films,
      columns
    };
  }
});
</script>

<style lang="sass" scoped>
.p-s
  padding: 0.2rem


.section-esp-padding
  padding: 1rem 1rem 0 1rem

.my-custome-table
  max-height: 85vh
</style>

