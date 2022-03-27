<template>
  <q-page class="flex-block p-s">
    <q-card class="my-card bg-primary text-white">
      <q-card-section>
        <q-card class="my-card bg-white text-primary">

          <div class="q-pa-md">
            <q-table
              class="my-custome-table"
              title="Registro de Films"
              :loading="loading"
              :rows="films"
              :columns="columns"
              :filter="filter"
              no-data-label="No hemos encontrado ningun resultado"
              row-key="name"
              flat
              bordered>
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

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <span v-if="col.name !=='Imagen'" style="font-size: 1rem">{{ col.value }}</span>
                    <q-avatar v-if="col.name ==='Imagen'" size="100px" class="shadow-10">
                      <img alt="{{props.row.Imagen}}" :src="props.row.Imagen">
                    </q-avatar>
                  </q-td>
                </q-tr>
              </template>

              <template v-slot:top-right>
                <q-input outlined dense debounce="300" v-model="filter" placeholder="Busqueda" style="padding-right: 1rem">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn color="primary" icon="autorenew" label="Recargar" @click="getFilms"/>
              </template>

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

    onMounted(async () => {
      await getFilms();
    });

    return {
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
  max-height: 78vh
</style>

