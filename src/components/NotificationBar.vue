<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { setTimeout, clearTimeout } from 'timers'
export default {
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
