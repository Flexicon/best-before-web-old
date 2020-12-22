<template>
  <b-card
    :title="name"
    img-src="https://picsum.photos/600/300/?image=25"
    :img-alt="`${name} - image`"
    img-top
    tag="article"
  >
    <b-card-text>
      {{ $moment(expiryDate).format('MMMM Do YYYY') }}
    </b-card-text>

    <div class="ProductListItem__actions">
      <b-button variant="danger">
        <b-icon-trash-fill />
      </b-button>

      <b-button variant="warning">
        <b-icon-pencil-fill />
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.ProductListItem__actions button {
  font-size: 0.75rem;
}
</style>
