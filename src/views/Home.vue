<template>
  <div class="flex flex-col h-screen">
    <nav-bar></nav-bar>
    <section class="bg-gray-700 text-white h-screen flex items-center">
        <div class="container mx-auto text-center">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">KMWallet</h1>
            <p class="text-base md:text-lg mb-8">Your online banking solution.</p>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-100">
        <div class="container mx-auto text-center">
            <h2 class="text-xl md:text-2xl font-bold mb-8">Why KMWallet?</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Feature Card 1 -->
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">Secure Transactions</h3>
                    <p class="text-blue-600">Encrypted and secure transactions.</p>
                </div>

                <!-- Feature Card 2 -->
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">24/7 Access</h3>
                    <p class="text-blue-600">Access your accounts anytime, anywhere.</p>
                </div>

                <!-- Feature Card 3 -->
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">Easy Fund Management</h3>
                    <p class="text-blue-600">Manage your funds with simplicity.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="bg-gray-700 text-white py-16">
        <div class="container mx-auto text-center">
            <h2 class="text-xl md:text-2xl font-bold mb-4">Get Started with KMWallet</h2>
            <p class="text-base md:text-lg mb-8">Join us today and experience hassle-free banking.</p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto text-center">
            <p>&copy; 2024 KMWallet. All rights reserved.</p>
        </div>
    </footer>
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
