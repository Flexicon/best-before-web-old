<template>
  <b-overlay :show="busy" rounded="sm">
    <b-card
      :title="name"
      :img-src="`https://picsum.photos/seed/${id}/600/300`"
      :img-alt="`${name} - image`"
      img-top
      tag="article"
    >
      <b-card-text>
        {{ $moment(expiryDate).format('MMMM Do YYYY') }}
      </b-card-text>

      <div class="ProductListItem__actions">
        <b-button variant="danger" @click="$emit('remove')">
          <b-icon-trash-fill />
        </b-button>

        <b-button variant="warning" @click="$emit('edit')">
          <b-icon-pencil-fill />
        </b-button>
      </div>
    </b-card>
  </b-overlay>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    busy: Boolean,
  },
}
</script>

<style scoped>
.ProductListItem__actions button {
  font-size: 0.75rem;
}
</style>
