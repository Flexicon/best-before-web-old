<template>
  <div>
    <b-modal title="Add Product" :visible="value" @change="$emit('input', $event)" @show="resetForm" @ok="handleOk">
      <b-form>
        <b-form-group label="Product Name:" label-for="name">
          <b-form-input id="name" v-model="form.name" :state="nameState" required></b-form-input>
        </b-form-group>

        <b-form-group label="Expiry Date:" label-for="expiry-date">
          <b-form-datepicker id="expiry-date" v-model="form.expiryDate" :state="expiryDateState" />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },

  data() {
    return {
      form: {
        name: '',
        expiryDate: '',
      },
      initialNameState: '',
      initialExpiryDateState: '',
    }
  },

  computed: {
    // TODO: get proper form validation in place
    nameState() {
      return !!this.form.name || null
    },

    expiryDateState() {
      return !!this.form.expiryDate || null
    },
  },

  methods: {
    resetForm() {
      this.form = {
        name: '',
        expiryDate: '',
      }
    },

    checkFormValid() {
      return this.form.name && this.form.expiryDate
    },

    handleOk(e) {
      e.preventDefault()

      if (!this.checkFormValid()) {
        return
      }

      this.$bvToast.toast('Cool 👍', { title: 'Alright!', variant: 'success' })
      this.hideModal()
    },

    hideModal() {
      this.$emit('input', false)
    },
  },
}
</script>
