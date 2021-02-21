<template>
  <div class="mt-4">
    <h4>Account Settings</h4>

    <div class="wrapper mt-5">
      <b-row class="setting-row">
        <b-col cols="12" lg="6" class="settings-header">
          <div>Notifications</div>
          <small class="text-muted">
            Setup notifications so you know exactly when your products are about to expire.
          </small>
        </b-col>

        <b-col>
          <b-form-checkbox v-model="notifications" name="notifications" switch>Enable notifications</b-form-checkbox>
        </b-col>
      </b-row>

      <template v-if="notifications">
        <b-row class="setting-row">
          <b-col cols="12" lg="6" class="settings-header">
            <div>Webhook</div>
            <small class="text-muted">Get notified about an expiring product via custom webhook.</small>
          </b-col>

          <b-col>
            <b-form-input v-model="webhook" size="sm" />
          </b-col>
        </b-row>

        <b-row class="setting-row">
          <b-col cols="12" lg="6" class="settings-header">
            <div>Email</div>
            <small class="text-muted">Receive an email whenever any of your products are about to expire.</small>
          </b-col>

          <b-col>
            <b-form-input v-model="email" size="sm" type="email" />
          </b-col>
        </b-row>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: false,
      webhook: '',
      // TODO: get user's default email from their auth token
      email: 'john.d@example.com',
    }
  },
}
</script>

<style scoped>
.settings-header {
  margin-bottom: 1.5rem;
}

.settings-header small {
  display: block;
  line-height: 1rem;
  margin-top: 0.5rem;
}

.setting-row {
  align-items: center;
  margin-bottom: 1.5rem;
}

@media only screen and (min-width: 992px) {
  .wrapper {
    max-width: 900px;
  }

  .settings-header {
    padding-right: 5rem;
    margin-bottom: 0px;
  }
}
</style>
