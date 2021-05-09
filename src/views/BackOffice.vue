<template>
  <div class="home">

    <AddItem/>
    <TableViewer />

  </div>
</template>

<script>
import AddItem from "@/components/AddItem";
import TableViewer from "@/components/TableViewer";
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
  name: "BackOffice",
  props: ['item'],
  components: {
    AddItem, TableViewer,
  },
  data() {
    return {
      // isReload: false
    }
  },
  methods: {
    // reloadTable() {
    //   this.isReload = !this.isReload;
    // }
  }
}
</script>

<style scoped>
.home {
  background-color: #eed4b8;
}
</style>