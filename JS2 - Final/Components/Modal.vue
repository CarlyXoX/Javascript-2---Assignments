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
  name: 'PetInfoModal',
  props: {
    visible: Boolean,
    cat: Object
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
