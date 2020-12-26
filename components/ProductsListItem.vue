<template>
  <b-overlay :show="busy" rounded="sm">
    <b-card
      :title="name"
      :img-src="`https://picsum.photos/seed/${id}/600/300`"
      :img-alt="`${name} - image`"
      img-top
      tag="article"
      class="ProductsListItem__card"
    >
      <b-card-text>
        {{ $moment(expiryDate).format('MMMM Do YYYY') }}
      </b-card-text>

      <div class="ProductsListItem__actions">
        <b-button variant="danger" @click="onRemove">
          <b-icon-trash-fill />
        </b-button>

        <b-button variant="outline-warning" @click="$emit('edit')">
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

  methods: {
    async onRemove() {
      const ok = await this.$bvModal.msgBoxConfirm(`Are you sure you want to remove "${this.name}"?`, {
        title: 'Remove',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Remove',
        cancelVariant: 'outline-secondary',
        footerClass: 'p-2',
        centered: true,
      })

      if (ok) {
        this.$emit('remove')
      }
    },
  },
}
</script>

<style scoped>
.ProductsListItem__actions button {
  font-size: 0.75rem;
}

.ProductsListItem__card {
  box-shadow: 0px 3px 5px 0px #ddd;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ProductsListItem__card:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 10px 0px #ddd;
}

.card-img-top {
  min-height: 174px;
}
</style>
