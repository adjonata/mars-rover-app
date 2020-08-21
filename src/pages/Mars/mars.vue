<style>
.form {
  width: 300px;
  padding: 15px 30px;
  border-radius: 3px;
  margin-top: 50px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form input {
  margin: 7px 0 15px 0;
  border-radius: 6px;
  border-bottom: solid 1px #cecece;
  padding: 8px 10px;
}
.viewer-images {
  width: 70%;
  padding: 8px;
  border-radius: 7px;
  border: solid 1px #cecece;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.viewer-images img {
  width: 30%;
  border-radius: 3px;
  margin-bottom: 10px;
}

@media (max-width: 800px) {
  .form {
    width: 80%;
  }
  .viewer-images {
    width: 95%;
  }
  .viewer-images img {
    width: 48%;
  }
}
</style>

<template>
  <container class="layout-columns">
    <template v-slot:content>
      <div class="form shadow">
        <label>Escolha o dia:</label>
        <input type="date" v-model="data" />

        <label>Escolha o sol:</label>
        <input type="number" v-model="sol" />

        <label>Máximo Imagens:</label>
        <input type="number" v-model="max" />

        <aButton label="Buscar" @click="loadImages()" icon="search" />
      </div>

      <div class="viewer-images" v-if="dados.length > 0">
        <img :src="reg.img_src" alt v-for="(reg, i) in dados" :key="'reg_'+i" />
      </div>
    </template>
  </container>
</template>

<script>
import { BUSCAR_FOTOS } from "./mars.service"
import { aButton } from "../../components/form/all.js"
import container from "../../components/container"

export default {
  name: "mars-photos",
  components: {
    aButton,
    container,
  },

  data() {
    return {
      data: "2020-06-02",
      sol: 1000,
      dados: [],
      max: 30,
    }
  },

  methods: {
    loadImages() {
      BUSCAR_FOTOS(this.data, this.sol).then((res) => {
        const photos = res["data"].photos

        let atual = 0

        this.dados = photos.filter((photo) => {
          atual++
          return atual <= this.max
        })
      })
    },
  },
}
</script>
