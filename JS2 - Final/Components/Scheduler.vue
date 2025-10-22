<template>
  <div class="scheduler">
    <h2>Scheduled Meet-&-Greets</h2>

    <div v-if="userPreferences.meetings && userPreferences.meetings.length > 0">
      <div v-for="(meet,index) in userPreferences.meetings" :key="index">
        <p>{{ meet.userName }} with {{ meet.catsOfInterest.join(', ') }} on {{ meet.date }} at {{ meet.startTime }}</p>
      </div>
    </div>
    <div v-else>
      <p>No meetings scheduled.</p>
      <button @click="$emit('go-to-form')">Schedule a Meet-&-Greet</button>
    </div>

    <button @click="$emit('back')">Back</button>
  </div>
</template>

<script>
export default {
  name:'Scheduler',
  props: ['userPreferences']
}
</script>
