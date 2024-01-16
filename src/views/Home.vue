<template>
	<div class="home container">
    <nav-bar></nav-bar>
    <h1>Home</h1>
	</div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { NavBar },
  name: 'Home',
  },
);
    NavBar
</script>
