<template>
  <q-page class="flex flex-center text-primary">

    {{ films }}
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import * as Api from "../boot/axios";

export default defineComponent({
  name: "IndexPage",
  setup() {
    let films = ref([]);
    const log = () => {
      console.log(films.value);
    };
    const getFilms = async () => {
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
          console.warn('Api /films endpoint error: '+err);
        });
    };

    onMounted(async () => {
      await getFilms();
    });

    return {
      films,
      log
    };
  }
});
</script>
