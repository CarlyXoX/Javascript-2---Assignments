<template>
  <div class="cats-card">
    <h2>{{ cat.name }}</h2>
    <p><strong>Age:</strong> {{ cat.age }} years</p>
    <p><strong>Adoption Fee:</strong> ${{ cat.fee }}</p>
    <p><strong>Description:</strong> {{ cat.description }}</p>

    <div class="actions">
      <button @click="toggleFavorite">
        {{ isFavorite ? '★ Favorite' : '☆ Add to Favorites' }}
      </button>
      <button @click="$emit('open-modal', cat)">More Info</button>
      <button @click="$emit('open-modal', cat)">Schedule Meet</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListingCard',
  props: {
    cat: Object,
    favorites: Array
  },
  computed: {
    isFavorite() {
      return this.favorites?.some(f => f.id === this.cat.id);
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('favorite-changed', this.cat);
    }
  }
};
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
