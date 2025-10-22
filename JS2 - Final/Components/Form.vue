<template>
  <div class="form-container">
    <h1>Cat Meet-&-Greet Appointment</h1>
    <form @submit.prevent="submitForm">
      <!-- Contact Info -->
      <section>
        <label>Name: <input type="text" v-model="form.userName" required/></label>
        <label>Email: <input type="email" v-model="form.email" required/></label>
        <label>
          Phone:
          <input type="tel" v-model="form.phone" placeholder="(555) 555-5555" @input="formatPhone" required/>
        </label>
      </section>

      <!-- Date & Time -->
      <section>
        <label>Date: <input type="date" v-model="form.date" required/></label>
        <label>Start Time: <input type="time" v-model="form.startTime" required/></label>
        <label>End Time: <input type="time" v-model="form.endTime" required/></label>
      </section>

      <!-- Cats of Interest -->
      <section>
        <h4>Cats of Interest</h4>
        <div class="search-select">
          <input type="text" placeholder="Search cats..." v-model="searchQuery"/>
          <div v-for="cat in filteredCats" :key="cat.id">
            <input type="checkbox" :id="'cat-'+cat.id" :value="cat.id" v-model="form.catsOfInterest"/>
            <label :for="'cat-'+cat.id">{{ cat.name }}</label>
          </div>
        </div>
        <button type="button" @click="toggleSelectAll">
          {{ allSelected ? 'Deselect All' : 'Select All' }}
        </button>
      </section>

      <button type="submit">Submit Appointment</button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Form',
  props: {
    cats: Array,
    favoriteIds: Array,
    userPreferences: Object
  },
  emits: ['appointment-submitted'],
  setup(props, { emit }) {
    const form = ref({
      userName: '',
      email: '',
      phone: '',
      date: '',
      startTime: '',
      endTime: '',
      catsOfInterest: []
    });

    const searchQuery = ref('');

    const filteredCats = computed(() => 
      props.cats.filter(cat => cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );

    const allSelected = computed(() => 
      form.value.catsOfInterest.length === props.favoriteIds.length
    );

    const toggleSelectAll = () => {
      form.value.catsOfInterest = allSelected.value ? [] : [...props.favoriteIds];
    };

    const formatPhone = () => {
      let x = form.value.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      form.value.phone = !x[2] ? x[1] : '('+x[1]+') '+x[2]+(x[3]?'-'+x[3]:'');
    };

    const submitForm = () => {
      const newMeeting = {
        id: Date.now(),
        ...form.value
      };
      props.userPreferences.meetings.push(newMeeting);
      localStorage.setItem('userPreferences', JSON.stringify(props.userPreferences));
      emit('appointment-submitted', newMeeting);
      Object.keys(form.value).forEach(key => form.value[key] = key === 'catsOfInterest' ? [] : '');
      alert('Appointment submitted!');
    };

    return { form, searchQuery, filteredCats, allSelected, toggleSelectAll, formatPhone, submitForm };
  }
};
</script>
