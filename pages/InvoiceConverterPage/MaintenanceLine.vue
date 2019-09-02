<template>
  <el-card class="box-card">
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <el-select v-model="maintenanceLine.categorie_id" placeholder="Status">
        <el-option
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          :value="category.id"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-button
        @click="$emit('remove', maintenanceLine)"
        size="mini"
        type="danger">Remove
      </el-button>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-card>
</template>

<script>
export default {
  name: "MaintenanceLine",
  props: ['maintenanceLine', 'categories']
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  padding: 10px;
}
</style>
