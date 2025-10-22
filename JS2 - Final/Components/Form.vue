<template>
  <div class="form-container">
    <h1>Cat Meet-&-Greet Appointment</h1>

    <form @submit.prevent="submitForm">
      <section>
        <h4>Contact Information</h4>
        <label>Name: <input type="text" required v-model="formData.userName" /></label>
        <label>Email: <input type="email" required v-model="formData.email" /></label>
        <label>Phone: <input type="tel" required v-model="formData.phone" @input="formatPhone" /></label>
      </section>

      <section>
        <h4>Time and Date</h4>
        <label>Date: <input type="date" required v-model="formData.date" /></label>
        <label>Start Time: <input type="time" required v-model="formData.startTime" /></label>
        <label>End Time: <input type="time" required v-model="formData.endTime" /></label>
      </section>

      <section>
        <h4>Cats of Interest</h4>
        <div v-for="cat in favorites" :key="cat.id">
          <input type="checkbox" :id="'cat-'+cat.id" :value="cat.name" v-model="formData.catsOfInterest" />
          <label :for="'cat-'+cat.id">{{ cat.name }}</label>
        </div>
      </section>

      <button type="submit">Submit Appointment</button>
      <button type="button" @click="$emit('back')">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    favorites: Array,
    prefilledCat: Object
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
        catsOfInterest: this.prefilledCat ? [this.prefilledCat.name] : []
      }
    }
  },
  methods: {
    formatPhone() {
      let x = this.formData.phone.replace(/\D/g,'').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      this.formData.phone = !x[2] ? x[1] : '('+x[1]+') '+x[2]+(x[3] ? '-'+x[3] : '')
    },
    submitForm() {
      const newMeeting = { ...this.formData, id: Date.now() }
      this.$emit('appointment-submitted', newMeeting)
      this.formData = {
        userName:'', email:'', phone:'', date:'', startTime:'', endTime:'', catsOfInterest:[]
      }
    }
  }
}
</script>
