<template>
  <div class="scheduler">
    <h1>Your Scheduled Meet-&-Greets</h1>

    <div v-if="userPreferences.meetings.length > 0">
      <div v-for="(meet, i) in userPreferences.meetings" :key="i" class="meeting-card">
        <h3>{{ meet.userName }}</h3>
        <p><strong>Email:</strong> {{ meet.email }}</p>
        <p><strong>Phone:</strong> {{ meet.phone }}</p>
        <p><strong>Date:</strong> {{ meet.date }}</p>
        <p><strong>Time:</strong> {{ meet.startTime }} – {{ meet.endTime }}</p>
        <p><strong>Cats of Interest:</strong> {{ meet.catsOfInterest.join(', ') }}</p>
        <button @click="cancelMeeting(i)">Cancel</button>
      </div>
    </div>

    <div v-else>
      <p>No scheduled meets yet</p>
      <button @click="$emit('open-form')">Schedule a Meet-&-Greet</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scheduler',
  props: {
    userPreferences: Object
  },
  emits: ['meeting-cancelled', 'open-form'],
  setup(props, { emit }) {
    const cancelMeeting = (index) => {
      if(confirm('Cancel this meet?')) {
        props.userPreferences.meetings.splice(index, 1);
        localStorage.setItem('userPreferences', JSON.stringify(props.userPreferences));
        emit('meeting-cancelled', index);
      }
    };
    return { cancelMeeting };
  }
};
</script>
