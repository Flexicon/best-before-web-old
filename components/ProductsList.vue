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
        <products-list-item v-bind="p" @remove="$emit('remove', { ...p })" @edit="openEditModal(p)" />
      </b-col>
    </b-row>

    <product-form-modal v-model="isModalOpenModel" :busy="saving" :product="editedProduct" @save="onModalSave" />
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
    saving: Boolean,
    isModalOpen: Boolean,
  },

  data() {
    return {
      editedProduct: null,
    }
  },

  computed: {
    isModalOpenModel: {
      get() {
        return this.isModalOpen
      },

      set(val) {
        val ? this.openAddModal() : this.closeAddModal()
      },
    },
  },

  methods: {
    openAddModal() {
      this.editedProduct = null
      this.$emit('open-modal')
    },

    closeAddModal() {
      this.$emit('close-modal')
    },

    openEditModal(product) {
      this.editedProduct = { ...product }
      this.$emit('open-modal')
    },

    onModalSave(data) {
      const id = this.editedProduct?.id || undefined
      this.$emit('save', { ...data, id })
    },
  },
}
</script>
