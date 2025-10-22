<template>
  <div id="app">
    <h1>Welcome to the Cat Adoption Center</h1>

    <!-- Cats Listing -->
    <div class="cats-list">
      <ListingCard
        v-for="cat in cats"
        :key="cat.id"
        :cats="cat"
        :favorite-ids="userPreferences.favorites"
        @toggle-favorite="handleToggleFavorite"
        @open-modal="openModal"
        @open-scheduler="openSchedulerForm"
      />
    </div>

    <!-- Favorites List -->
    <FavoritesList
      :userPreferences="userPreferences"
      @favorite-removed="handleFavoriteRemoved"
    />

    <!-- Conditional Views -->
    <Form
      v-if="showForm"
      :favorites="favoriteCats"
      @appointment-submitted="handleAppointmentSubmitted"
      @close-form="showForm = false"
    />

    <Scheduler
      v-if="showScheduler"
      :userPreferences="userPreferences"
      @meeting-cancelled="handleMeetingCancelled"
      @open-form="showForm = true"
    />

    <!-- Modal -->
    <Modal
      v-if="modalVisible"
      :cat="selectedCat"
      :visible="modalVisible"
      @close="modalVisible = false"
    />
  </div>
</template>

<script>
import ListingCard from './Components/ListingCard.vue';
import FavoritesList from './Components/FavoritesList.vue';
import Form from './Components/Form.vue';
import Scheduler from './Components/Scheduler.vue';
import Modal from './Components/Modal.vue';

export default {
  name: 'App',
  components: {
    ListingCard,
    FavoritesList,
    Form,
    Scheduler,
    Modal
  },
  data() {
    return {
      cats: [],
      userPreferences: {
        user: { id: 1, name: 'Guest User', email: '' },
        favorites: [],
        meetings: []
      },
      modalVisible: false,
      selectedCat: null,
      showForm: false,
      showScheduler: false
    };
  },
  computed: {
    favoriteCats() {
      return this.cats.filter(cat => this.userPreferences.favorites.includes(cat.id));
    }
  },
  async mounted() {
    // Load cats
    try {
      const res = await fetch('./cats.json');
      this.cats = await res.json();
    } catch (err) {
      console.error('Could not load cats.json:', err);
    }

    // Load user preferences from localStorage or fallback JSON
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      this.userPreferences = JSON.parse(savedPrefs);
    } else {
      try {
        const res = await fetch('./userPreferences.json');
        this.userPreferences = await res.json();
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
      } catch {
        console.warn('No userPreferences.json found — using default');
      }
    }
  },
  methods: {
    // Toggle favorite status
    handleToggleFavorite(cat) {
      const index = this.userPreferences.favorites.indexOf(cat.id);
      if (index >= 0) this.userPreferences.favorites.splice(index, 1);
      else this.userPreferences.favorites.push(cat.id);
      localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    },

    handleFavoriteRemoved(catId) {
      const index = this.userPreferences.favorites.indexOf(catId);
      if (index >= 0) this.userPreferences.favorites.splice(index, 1);
      localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    },

    // Modal
    openModal(cat) {
      this.selectedCat = cat;
      this.modalVisible = true;
    },

    // Scheduler/Form
    openSchedulerForm(cat) {
      this.showForm = true;
    },

    handleAppointmentSubmitted(newMeeting) {
      this.userPreferences.meetings.push(newMeeting);
      localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
      this.showForm = false;
      this.showScheduler = true;
    },

    handleMeetingCancelled() {
      localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    }
  }
};
</script>

<style>
#app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #0c1b22;
  background-color: var(--primary);
}

.cats-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>
