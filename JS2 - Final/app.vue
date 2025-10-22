<template>
  <div id="app">
    <h1>🐾 Cat Adoption Center 🐾</h1>

    <div v-if="loading">Loading cats...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && cats.length && !currentView">
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

      <button @click="currentView='favorites'">View Favorites</button>
      <button @click="currentView='scheduler'">View Scheduled Meet-&-Greets</button>
    </div>

    <Modal
      v-if="modalCat"
      :cat="modalCat"
      @close="modalCat=null"
      @go-to-form="openForm(modalCat)"
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
import ListingCard from './components/ListingCard.vue';
import Modal from './components/Modal.vue';
import Form from './components/Form.vue';
import FavoritesList from './components/FavoritesList.vue';
import Scheduler from './components/Scheduler.vue';

export default {
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
    };
  },
  async mounted() {
    try {
      // load cats
      const res = await fetch('cats.json');
      if (!res.ok) throw new Error('Could not load cats.json');
      this.cats = await res.json();

      // load preferences
      const stored = localStorage.getItem('userPrefs');
      if (stored) this.userPrefs = JSON.parse(stored);
      else {
        const prefsRes = await fetch('userPreferences.json');
        this.userPrefs = await prefsRes.json();
      }

      this.favorites = this.userPrefs.favorites || [];
    } catch (err) {
      console.error(err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    toggleFavorite(cat) {
      const idx = this.favorites.findIndex(f => f.id === cat.id);
      if (idx >= 0) this.favorites.splice(idx, 1);
      else this.favorites.push(cat);

      this.userPrefs.favorites = this.favorites;
      localStorage.setItem('userPrefs', JSON.stringify(this.userPrefs));
    },
    removeFavorite(cat) {
      this.favorites = this.favorites.filter(f => f.id !== cat.id);
      this.userPrefs.favorites = this.favorites;
      localStorage.setItem('userPrefs', JSON.stringify(this.userPrefs));
    },
    openModal(cat) {
      this.modalCat = cat;
    },
    openForm(cat) {
      this.modalCat = cat;
      this.currentView = 'form';
    },
    submitAppointment(meeting) {
      if (!this.userPrefs.meetings) this.userPrefs.meetings = [];
      this.userPrefs.meetings.push(meeting);
      localStorage.setItem('userPrefs', JSON.stringify(this.userPrefs));
      this.currentView = null;
      this.modalCat = null;
    }
  }
};
</script>

<style>
#app { padding: 2rem; }
.cats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px,1fr)); gap: 1rem; }
.error { color: red; }
</style>
