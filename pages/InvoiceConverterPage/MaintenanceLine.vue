<template>
  <el-row type="flex" class="row">
    <el-card>
      <el-select class="select" v-model="maintenanceLine.categorie_id" placeholder="Status">
        <el-option
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          :value="category.id"
        ></el-option>
      </el-select>
    </el-card>
    <el-button @click="$emit('remove', maintenanceLine)" size="mini" type="danger">Remove</el-button>
  </el-row>
</template>

<script>
export default {
  name: "MaintenanceLine",
  props: ["maintenanceLine", "categories"]
};
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
.row {
  margin-bottom: 20px;
}
</style>
