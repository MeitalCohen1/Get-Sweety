<template>
  <div class="home">

    <AddItem :tableName="'tableRecipes'" @itemAdded="reloadTable"/>
    <TableViewer :tableName="'tableRecipes'" :isReload="isReload"/>

  </div>
</template>

<script>
import AddItem from "@/components/AddItem";
import TableViewer from "@/components/TableViewer";

export default {
  name: "BackOffice",
  props: ['item'],
  components: {
    AddItem, TableViewer,
  },
  data() {
    return {
      isReload: false
    }
  },
  methods: {
    reloadTable() {
      this.isReload = !this.isReload;
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #eed4b8;
}
</style>