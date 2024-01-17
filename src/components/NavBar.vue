<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
            <div class="container">
                <a class="navbar-brand" href="#">KMWALLET</a>

                <button class="navbar-toggler" type="button" @click="toggleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" :class="{ 'show': isNavbarCollapsed }">
                    <ul class="navbar-nav">
                        <li class="nav-item active" v-for="link in links" :key="link.id">
                            <router-link v-if="displayDashLink(link.path.name)" :class="activeLink(link.path.name)" :to="link.path">{{ link.linkName }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { links } from "../types/links"

export default defineComponent({
    setup() {
        const route = useRoute();

        const links = reactive<links[]>([
            { linkId: 1, linkName: "Home", path: { name: "home" } },
            { linkId: 2, linkName: "Signup", path: { name: "signup" } },
            { linkId: 3, linkName: "Login", path: { name: "login" } },
            { linkId: 4, linkName: "FAQs", path: { name: "faqs" } },
            { linkId: 5, linkName: "Community", path: { name: "community" } },
            { linkId: 6, linkName: "Dashboard", path: { name: "dashboard" } },
        ])

        console.log(route.name);

        const linkClass = reactive<String[]>(["nav-link"]);
        const linkActive = ref<String>("active");

        function activeLink(path: String) {
            if (route.name == path) return [...linkClass, linkActive.value];
            return linkClass;
        }

        function displayDashLink(path: String) {
            return (path !== "dashboard" && path !== "community") || localStorage.getItem('userData') !== null;
        }

        let isNavbarCollapsed = ref<boolean>(false);

        function toggleNavbar() {
            isNavbarCollapsed.value = !isNavbarCollapsed.value;
        }

        return {
            links,
            activeLink,
            displayDashLink,
            isNavbarCollapsed,
            toggleNavbar
        }
    },
})
</script>
