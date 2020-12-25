<template>
  <div>
    <div v-if="busy" class="text-center">
      <b-spinner />
    </div>

    <b-row v-else>
      <b-col v-for="p in products" :key="p.id" cols="12" sm="6" lg="4" class="mb-4">
        <product-list-item v-bind="p" @remove="$emit('remove', { ...p })" @edit="$emit('edit', { ...p })" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
    busy: Boolean,
  },
}
</script>
