<template>
  <div v-if="visible" class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">×</button>
      <h2>{{ cat.name }}</h2>
      <p><strong>Age:</strong> {{ cat.age }} years</p>
      <p><strong>Adoption Fee:</strong> ${{ cat.adoptionFee }}</p>
      <p><strong>Description:</strong> {{ cat.description }}</p>
      <p><strong>Health History:</strong> {{ cat.healthHistory }}</p>
      <p><strong>Contact Number:</strong> {{ cat.contactNumber }}</p>
      <p><strong>Location:</strong> {{ cat.location }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: Boolean,
    cat: Object
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => emit('close');
    return { close };
  }
};
</script>
