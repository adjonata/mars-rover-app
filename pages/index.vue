<template>
  <section class="sectionn">
    <div class="days">
      <div
        v-for="(day, index) in manifests"
        :key="'day_' + index"
        class="days-item"
      >
        <h3>{{ formatDate(day.earth_date) }}</h3>
        <button @click="findPhotos(day.earth_date)">Show photos</button>
      </div>
    </div>
    <div class="photos-section">
      <h3 v-if="selectedDay">{{ selectedDay }}</h3>
      <div class="photos">
        <div
          v-for="(photo, index) in photos"
          :key="'photo_' + index"
          class="photos-item"
        >
          <img :src="photo.src" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import * as dateFns from 'date-fns'

export default {
  name: 'HomePage',

  data: () => ({
    selectedDay: null,
    photos: [],
  }),

  computed: {
    ...mapGetters('manifests', ['manifests']),
  },

  created() {
    this.$manifests.sync()
  },

  methods: {
    async findPhotos(date) {
      const dateISO = dateFns.parseISO(date)
      const format = 'yyyy-MM-dd'
      const today = dateFns.format(dateISO, format)
      const tomorrow = dateFns.format(dateFns.addDays(dateISO, 2), format)

      return await this.$photos.getByPeriod(today, tomorrow).then((photos) => {
        this.photos = photos
        this.selectedDay = today
      })
    },
    formatDate(date) {
      const dateISO = dateFns.parseISO(date)
      return dateFns.format(dateISO, 'dd/MM/yyyy')
    },
  },
}
</script>

<style>
.sectionn {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
}

.days {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  width: 300px;
  overflow-y: auto;
  padding: 30px 0;
}

.days-item {
  display: flex;
  margin-bottom: 10px;
  width: 200px;
}

.days-item button {
  margin-left: 20px;
}

.photos {
  max-height: 100vh;
  overflow-y: auto;
}
.photos-section {
  padding: 30px;
}
</style>
