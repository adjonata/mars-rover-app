<template>
  <div class="w-100 h-100 d-flex grey darken-3">
    <v-card class="pa-5 w-23">
      <div class="w-100 d-flex flex-column">
        {{ earth_date }}
        <v-date-picker v-model="earth_date" class="pb-5" width="100%" dark />
        <v-select
          :items="cams"
          v-model="camera"
          label="Câmera:"
          solo
          class="w-100 mt-4"
          dark
        >
        </v-select>
        <v-btn
          depressed
          elevation="2"
          color="indigo darken-2"
          @click="getImages"
          :loading="loading"
        >
          Procurar
        </v-btn>
      </div>
    </v-card>
    <div class="d-flex w-77 pa-5">
      <v-row class="flex-wrap w-100 align-start h-100">
        <v-col
          cols="3"
          class="pa-2 mouse-pointer"
          v-for="image in images"
          :key="'image_' + image.id"
        >
          <v-img
            alt="Marte Image"
            class="shrink mr-2 clickable"
            contain
            :src="image.img_src"
            transition="scale-transition"
            width="100%"
            @click="(openedImage = image), (fullImage = true)"
          />
        </v-col>
      </v-row>
    </div>

    <v-overlay z-index="100" :value="fullImage" opacity="0.7">
      <div class="d-flex">
        <v-img
          alt="Opened Image"
          contain
          height="450"
          :src="openedImage"
          class="mt-6 h-60"
          @click="fullImage = false"
        />
      </div>
    </v-overlay>
  </div>
</template>

<script>
import mars from "@/services/mars.service.js";
import alert from "@/utils/alert.util.js";
import date from "@/utils/date.util.js";
// import images from "@/temp/images.js";
import { format } from "date-fns";

export default {
  name: "day-in-earth",
  props: {},
  data() {
    return {
      earth_date: format(new Date(), 'yyyy-MM-dd'),
      page: 1,
      camera: null,
      images: [],
      fullImage: false,
      openedImage: "",
      loading: false,
      cams: [
        "FHAZ",
        "RHAZ",
        "MAST",
        "CHEMCAM",
        "MAHLI",
        "MARDI",
        "NAVCAM",
        "PANCAM",
        "MINITES",
      ],
    };
  },
  mounted() {
    // alert.error();
  },
  methods: {
    async getImages() {
      const params = {
        earth_date: this.earth_date,
        camera: this.camera,
        page: this.page,
      };

      console.log(params);

      this.loading = true;
      await mars
        .query_by_sol(params)
        .then((res) => {
          this.images = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
