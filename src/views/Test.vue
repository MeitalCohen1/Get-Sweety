<template>
  <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">
<h3>
  TEST PAGE!!!!!!!!!!!!!!S
</h3>

  <q-btn v-model="model" icon="favorite" color="red" v-if="model" @click="model = !model"/>
  <q-btn v-model="model" icon="favorite" color="orange" v-if="!model" @click="model = !model"/>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      model: false
    }
  }
}
</script>

<style scoped>

</style>
