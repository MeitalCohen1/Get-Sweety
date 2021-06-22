<template>
  <div class="home">
    <AddItem/>
    <TableViewer />
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
}
</script>

<style scoped>
.home {
  background-color: rgba(190, 140, 100, 0.2);
  padding: 10px;
}
</style>
