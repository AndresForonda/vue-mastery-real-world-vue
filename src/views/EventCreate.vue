<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />
      <h3>Name & describe your event</h3>
      <BaseInput
        class="field"
        type="text"
        placeholder="Title"
        label="Title"
        v-model="event.title"
      />
      <BaseInput
        class="field"
        type="text"
        placeholder="Description"
        label="Description"
        v-model="event.description"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        class="field"
        type="text"
        placeholder="Location"
        label="Location"
        v-model="event.location"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <!-- <input class="button -fill-gradient" value="Submit" /> -->
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 0; i < 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      console.log(this.event)
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
        })
        .catch(() => {
          NProgress.done()
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 100000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
