<template>
  <div>
    <validation-observer v-slot="observerContext">
      <b-modal
        title="Add Product"
        :visible="value"
        @change="$emit('input', $event)"
        @show="resetForm"
        @ok="handleOk($event, observerContext)"
      >
        <b-form class="ProductForm" @keydown.meta.enter="handleOk($event, observerContext)">
          <b-form-group label="Product Name:" label-for="name">
            <validation-provider v-slot="v" name="Name" :rules="{ required: true, min: 3, max: 255 }">
              <b-form-input id="name" v-model="form.name" :state="getValidationState(v)" required></b-form-input>

              <b-form-invalid-feedback id="name-feedback">{{ v.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Expiry Date:" label-for="expiry-date">
            <validation-provider v-slot="v" name="Expiry Date" :rules="{ required: true }">
              <b-form-datepicker id="expiry-date" v-model="form.expiryDate" :state="getValidationState(v)" />

              <b-form-invalid-feedback id="expiry-date-feedback">{{ v.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
        </b-form>

        <b-spinner v-if="saving" />
      </b-modal>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    product: {
      type: Object,
      default: () => null,
    },
    value: Boolean,
    saving: Boolean,
  },

  data() {
    return {
      form: {
        name: '',
        expiryDate: '',
      },
    }
  },

  methods: {
    resetForm() {
      this.form = {
        name: this.product?.name ?? '',
        expiryDate: this.product?.expiryDate ?? '',
      }
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    handleOk(e, context) {
      e.preventDefault()
      context.validate()

      if (context.invalid) {
        return
      }

      this.$emit('save', { ...this.form })
    },

    hideModal() {
      this.$emit('input', false)
    },
  },
}
</script>

<style>
.ProductForm .form-group {
  margin-bottom: 5px;
  min-height: 95px;
}
</style>
