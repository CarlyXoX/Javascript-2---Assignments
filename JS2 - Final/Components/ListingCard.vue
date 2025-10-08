<template>
  <div class="cats-card">
    <h2>{{ cats.name }}</h2>
    <p><strong>Age:</strong> {{ cats.age }} years</p>
    <p><strong>Adoption Fee:</strong> ${{ cats.adoptionFee }}</p>
    <p><strong>Description:</strong> {{ cats.description }}</p>

    <div class="actions">
      <button @click="toggleFavorite">
        {{ cats.favorite ? '✰' : '★' }}
      </button>
      <button @click="$emit('open-modal', cats)">More Info</button>
      <button @click="$emit('open-scheduler', cats)">Schedule Meet</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatsCard',
  props: {
    cats: Object
  },
  emits: ['favorite-changed', 'open-modal', 'open-scheduler'],
  methods: {
    toggleFavorite() {
      const updatedCat = { ...this.cats, favorite: !this.cats.favorite }
      this.$emit('favorite-changed', updatedCat)
    }
  }
}
</script>

<style scoped>
.cats-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.actions {
  margin-top: 1rem;
}

.actions button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #007BFF;
  color: white;
}

.actions button:hover {
  background: #0056b3;
}
</style>