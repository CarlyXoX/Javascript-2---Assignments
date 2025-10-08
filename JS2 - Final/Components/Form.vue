<template>
  <div class="form-container">
    <h1>Cat Meet-&-Greet Appointment</h1>
    <h2>Meet your furever friend today!</h2>

    <form @submit.prevent="submitForm">
      <!-- Contact Info -->
      <section>
        <h4>Contact Information</h4>
        <label>
          Name:
          <input type="text" required v-model="formData.userName" />
        </label>

        <label>
          Email:
          <input type="email" required v-model="formData.email" />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            required
            v-model="formData.phone"
            placeholder="(555) 555-5555"
            @input="formatPhone"
          />
        </label>
      </section>

      <br />

      <!-- Time and Date -->
      <section>
        <h4>Time and Date</h4>
        <label>
          Date:
          <input type="date" required v-model="formData.date" />
        </label>

        <label>
          Start Time:
          <input type="time" required v-model="formData.startTime" />
        </label>

        <label>
          End Time:
          <input type="time" required v-model="formData.endTime" />
        </label>
      </section>

      <br />

      <!-- Cats of Interest -->
      <section>
        <h4>Cats of Interest</h4>
        <div class="search-select">
          <input
            type="text"
            placeholder="Search cats..."
            v-model="searchQuery"
          />
          <div class="dropdown">
            <div
              v-for="cat in filteredCats"
              :key="cat.id"
              class="dropdown-item"
            >
              <input
                type="checkbox"
                :id="'cat-' + cat.id"
                :value="cat.name"
                v-model="formData.catsOfInterest"
              />
              <label :for="'cat-' + cat.id">{{ cat.name }}</label>
            </div>
          </div>
        </div>

        <div class="select-all">
          <button type="button" @click="toggleSelectAll">
            {{ allSelected ? 'Deselect All Favorites' : 'Select All Favorites' }}
          </button>
        </div>
      </section>

      <br />

      <!-- Submit -->
      <button type="submit">Submit Appointment</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    favorites: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: {
        userName: '',
        email: '',
        phone: '',
        date: '',
        startTime: '',
        endTime: '',
        catsOfInterest: [],
      },
      userPreferences: null,
      searchQuery: '',
    }
  },
  computed: {
    filteredCats() {
      const q = this.searchQuery.toLowerCase()
      return this.favorites.filter((cat) =>
        cat.name.toLowerCase().includes(q)
      )
    },
    allSelected() {
      return (
        this.formData.catsOfInterest.length === this.favorites.length &&
        this.favorites.length > 0
      )
    },
  },
  async mounted() {
    await this.loadUserPreferences()
  },
  methods: {
    async loadUserPreferences() {
      try {
        const res = await fetch('./data/userPreferences.json')
        this.userPreferences = await res.json()
      } catch {
        // If not found, create a blank template
        this.userPreferences = {
          user: { id: 1, name: 'Guest User', email: '' },
          favorites: [],
          meetings: [],
        }
      }
    },

    formatPhone() {
      // Simple US-style input mask: (###) ###-####
      let x = this.formData.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      this.formData.phone = !x[2]
        ? x[1]
        : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
    },

    toggleSelectAll() {
      if (this.allSelected) {
        this.formData.catsOfInterest = []
      } else {
        this.formData.catsOfInterest = this.favorites.map((c) => c.name)
      }
    },

    async submitForm() {
      const newMeeting = {
        id: Date.now(),
        userName: this.formData.userName,
        email: this.formData.email,
        phone: this.formData.phone,
        date: this.formData.date,
        startTime: this.formData.startTime,
        endTime: this.formData.endTime,
        catsOfInterest: this.formData.catsOfInterest,
      }

      // Add to user preferences
      this.userPreferences.meetings.push(newMeeting)

      // Save to localStorage (acts as our "database write")
      localStorage.setItem('userPrefs', JSON.stringify(this.userPreferences))

      alert('Appointment submitted successfully!')
      this.$emit('appointment-submitted', newMeeting)

      // Optionally reset the form
      this.formData = {
        userName: '',
        email: '',
        phone: '',
        date: '',
        startTime: '',
        endTime: '',
        catsOfInterest: [],
      }
    },
  },
}
</script>

<style scoped>
</style>
