<template>
	<div class="home container">
    <nav-bar></nav-bar>
    <div class="row h-100 bg-warning">
      <div class="col-lg-6 col-12"><span>WELCOME TO KMWALLET</span></div>
      <div class="col-lg-6 col-12">
        <span>The future of online banking at the palm of your hands</span>
        <span>Fast and secure transactions at any place at any time</span>
      </div>
    </div>
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
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
