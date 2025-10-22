<template>
  <div class="favorites-container">
    <h2>Your Favorites</h2>
    <div v-if="favorites.length===0">No favorites yet.</div>
    <ul v-else>
      <li v-for="cat in favorites" :key="cat.id">
        {{ cat.name }}
        <button @click="removeFavorite(cat.id)">Remove</button>
      </li>
    </ul>
    <button @click="$emit('back')">Back</button>
  </div>
</template>

<script>
export default {
  name: 'FavoritesList',
  props: ['favorites'],
  methods: {
    removeFavorite(catId) {
      this.$emit('favorite-changed', {id: catId})
    }
  }
}
</script>
