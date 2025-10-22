<template>
  <div class="favorites-container">
    <h2>Your Favorite Cats</h2>

    <div v-if="favoriteCats.length === 0" class="no-favorites">
      <p>No favorites yet... Keep searching!</p>
    </div>

    <div v-else class="favorites-list">
      <div
        v-for="cat in favoriteCats"
        :key="cat.id"
        class="favorite-card"
      >
        <img :src="cat.image" :alt="cat.name" class="cat-image" />
        <div class="cat-info">
          <h3>{{ cat.name }}</h3>
          <p><strong>Age:</strong> {{ cat.age }} years</p>
          <p><strong>Adoption Fee:</strong> ${{ cat.adoptionFee }}</p>
        </div>
        <button class="remove-btn" @click="removeFavorite(cat.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'FavoritesList',
  props: {
    cats: Array,
    favoriteIds: Array
  },
  emits: ['remove-favorite'],
  setup(props, { emit }) {
    const favoriteCats = computed(() =>
      props.cats.filter(cat => props.favoriteIds.includes(cat.id))
    );

    const removeFavorite = (id) => {
      emit('remove-favorite', id);
    };

    return { favoriteCats, removeFavorite };
  }
};
</script>

<style scoped>
.favorites-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fffdfa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
h2 { text-align: center; color: #4a3f35; margin-bottom: 1rem; }
.no-favorites { text-align: center; color: #777; }
.favorites-list { display: flex; flex-direction: column; gap: 1rem; }
.favorite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fef6ed;
  border: 1px solid #e0d0b8;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
.cat-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.cat-info { flex: 1; margin-left: 1rem; }
.remove-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.remove-btn:hover { background-color: #e95757; }
</style>
