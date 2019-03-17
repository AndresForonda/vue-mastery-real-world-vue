<template>
  <div>
    <h1>
      The {{ resource ? resource : 'page' }} you're looking for is not here.
    </h1>
    <router-link :to="{ name: 'event-list' }">
      Back to the home page.
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String
    }
  }
}
</script>
