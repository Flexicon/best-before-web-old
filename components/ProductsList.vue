<template>
  <div>
    <div v-if="busy && !products.length" class="text-center">
      <b-spinner />
    </div>

    <b-row v-else>
      <b-col cols="12" sm="6" lg="4" class="mb-4">
        <products-list-item-skeleton @click="openAddModal" />
      </b-col>

      <b-col v-for="p in products" :key="p.id" cols="12" sm="6" lg="4" class="mb-4">
        <products-list-item v-bind="p" @remove="$emit('remove', { ...p })" @edit="$emit('edit', { ...p })" />
      </b-col>
    </b-row>

    <product-form-modal v-model="isModalOpen" @save="onSave" />
  </div>
</template>

<script>
import ProductFormModal from './ProductFormModal.vue'
export default {
  components: { ProductFormModal },
  props: {
    products: {
      type: Array,
      required: true,
    },
    busy: Boolean,
  },

  data() {
    return {
      isModalOpen: false,
    }
  },

  methods: {
    openAddModal() {
      this.isModalOpen = true
    },

    onSave(form) {
      console.log(form)
    },
  },
}
</script>
