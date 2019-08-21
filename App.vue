<template>
  <navbar></navbar>
</template>

<script lang="ts">
import NavbarVue from "./components/Navbar.vue";
import SidebarVue from "./components/Sidebar.vue";
export default {
  components: { sidebar: SidebarVue, navbar: NavbarVue }
};
</script>