<template>
  <b-overlay :show="busy" rounded="sm">
    <b-card
      :img-src="`https://picsum.photos/seed/${id}/600/300`"
      :img-alt="`${name} - image`"
      img-top
      tag="article"
      class="ProductsListItem__card"
      :class="{ expired: isExpired }"
    >
      <b-card-title class="mb-1">{{ name }}</b-card-title>

      <b-card-text>
        <span v-b-tooltip.hover :class="expiryIconClass" :title="expiryText">
          <b-icon :icon="expiryIcon" />
        </span>
        <span>{{ $moment(expiryDate).format('MMMM Do YYYY') }}</span>
      </b-card-text>

      <div class="ProductsListItem__actions">
        <b-button variant="outline-danger" @click="onRemove">
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

  computed: {
    daysTillExpiry() {
      const expiryDate = this.$moment(this.expiryDate).startOf('day')
      const today = this.$moment().startOf('day')

      return expiryDate.diff(today, 'days')
    },

    isExpired() {
      return this.daysTillExpiry <= 0
    },

    expiryIcon() {
      if (this.isExpired) {
        return 'exclamation-octagon-fill'
      }
      return this.daysTillExpiry <= 7 ? 'exclamation-triangle-fill' : 'clock'
    },

    expiryIconClass() {
      if (this.isExpired) {
        return 'text-danger'
      }
      return this.daysTillExpiry <= 7 ? 'text-warning' : ''
    },

    expiryText() {
      const { daysTillExpiry: days } = this

      if (days === 0) {
        return `Expires today`
      }
      return days < 0 ? `Expired ${Math.abs(days)} days ago` : `Expires in ${days} days`
    },
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
  transform: scale(1.02);
  box-shadow: 0px 6px 10px 0px #ddd;
}

.ProductsListItem__card.expired {
  background: rgba(255, 0, 0, 0.05);
}

.card-img-top {
  min-height: 174px;
}
</style>
