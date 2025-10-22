<template>
  <div class="app-container">
    <h1>🐾 Cat Adoption Center 🐾</h1>

    <div v-if="loading" class="status">Loading cats...</div>
    <div v-if="error" class="status error">{{ error }}</div>

    <div v-if="!loading && !currentView">
      <div class="cats-grid">
        <ListingCard
          v-for="cat in cats"
          :key="cat.id"
          :cat="cat"
          :favorites="favorites"
          @favorite-changed="toggleFavorite"
          @open-modal="openModal"
        />
      </div>
      <button @click="viewFavorites">View Favorites</button>
      <button @click="viewScheduler">View Scheduled Meet-&-Greets</button>
    </div>

    <Modal
      v-if="modalCat"
      :cat="modalCat"
      @close="modalCat = null"
      @go-to-form="openForm"
    />

    <Form
      v-if="currentView==='form'"
      :favorites="favorites"
      :prefilledCat="modalCat"
      @appointment-submitted="submitAppointment"
      @back="currentView=null"
    />

    <FavoritesList
      v-if="currentView==='favorites'"
      :favorites="favorites"
      @favorite-changed="removeFavorite"
      @back="currentView=null"
    />

    <Scheduler
      v-if="currentView==='scheduler'"
      :userPreferences="userPrefs"
      @go-to-form="openForm"
      @back="currentView=null"
    />
  </div>
</template>

<script>
import ListingCard from './Components/ListingCard.vue'
import Modal from './Components/Modal.vue'
import Form from './Components/Form.vue'
import FavoritesList from './Components/FavoritesList.vue'
import Scheduler from './Components/Scheduler.vue'

export default {
  name: 'App',
  components: { ListingCard, Modal, Form, FavoritesList, Scheduler },
  data() {
    return {
      cats: [],
      favorites: [],
      userPrefs: null,
      modalCat: null,
      currentView: null,
      loading: true,
      error: null
    }
  },
  async mounted() {
    try {
      const catsRes = await fetch('./cats.json')
      this.cats = await catsRes.json()

      const stored = localStorage.getItem('userPrefs')
      if (stored) {
        this.userPrefs = JSON.parse(stored)
        this.favorites = this.userPrefs.favorites || []
      } else {
        const prefsRes = await fetch('./userPreferences.json')
        this.userPrefs = await prefsRes.json()
        this.favorites = this.userPrefs.favorites || []
      }
    } catch (e) {
      console.error(e)
      this.error = 'Unable to load data. Make sure you’re running a local server.'
    } finally {
      this.loading = false
    }
  },
  methods: {
    toggleFavorite(cat) {
      const idx = this.favorites.findIndex(f => f.id === cat.id)
      if (idx >= 0) this.favorites.splice(idx, 1)
      else this.favorites.push(cat)

      this.userPrefs.favorites = this.favorites
      localStorage.setItem('userPrefs', JSON.stringify(this.userPrefs))
    },
    removeFavorite(cat) {
      this.favorites = this.favorites.filter(f => f.id !== cat.id)
      this.userPrefs.favorites = this.favorites
      localStorage.setItem('userPrefs', JSON.stringify(this.userPrefs))
    },
    openModal(cat) {
      this.modalCat = cat
    },
    openForm(cat=null) {
      this.modalCat = cat
      this.currentView = 'form'
    },
    submitAppointment(meeting) {
      if (!this.userPrefs.meetings) this.userPrefs.meetings = []
      this.userPrefs.meetings.push(meeting)
      localStorage.setItem('userPrefs', JSON.stringify(this.userPrefs))
      this.currentView = null
      this.modalCat = null
    },
    viewFavorites() {
      this.currentView = 'favorites'
    },
    viewScheduler() {
      this.currentView = 'scheduler'
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 2rem;
}

.cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
  gap: 1rem;
}

.status {
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem 0;
}
.status.error {
  color: red;
}
</style>
