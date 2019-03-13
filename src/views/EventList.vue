<template>
  <div>
    <h1>Events Listing</h1>
    <router-link :to="{ name: 'event-show', params: { id: 43 } }">
      Show Event
    </router-link>
  </div>
</template>
