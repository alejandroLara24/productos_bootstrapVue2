<template>
  <div class="row" id="messages">
    <div
      class="col-sm-12 alert alert-danger alert-dismissible"
      v-for="(message, index) in messages"
      :key="index"
    >
      <span><strong>ATENCIÓN: </strong>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        @click="delMessage(index)"
      ></button>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: "error-message",
  data() {
    return {
      messages: store.state.messages,
    };
  },
  methods: {
      delMessage(index) {
          this.messages.splice(index,1)
      }
  }
};
</script>