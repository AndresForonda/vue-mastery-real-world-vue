<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        :class="{ error: $v.event.category.$error }"
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        class="field"
        :class="{ error: $v.event.title.$error }"
        type="text"
        placeholder="Title"
        label="Title"
        v-model="event.title"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        class="field"
        :class="{ error: $v.event.description.$error }"
        type="text"
        placeholder="Description"
        label="Description"
        v-model="event.description"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        class="field"
        :class="{ error: $v.event.location.$error }"
        type="text"
        placeholder="Location"
        label="Location"
        v-model="event.location"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          :input-class="{ error: $v.event.date.$error }"
          v-model="event.date"
          placeholder="Select a date"
          @cleared="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        class="field"
        :class="{ error: $v.event.time.$error }"
        label="Select a time"
        :options="times"
        v-model="event.time"
        @blur="$v.event.time.$touch()"
      />

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        :disabled="$v.$anyError"
        type="submit"
        buttonClass="-fill-gradient"
      >
        Submit
      </BaseButton>
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s)
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
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
  },
  validations: {
    event: {
      category: { required },
      date: { required },
      description: { required },
      location: { required },
      time: { required },
      title: { required }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
