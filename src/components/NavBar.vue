<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <div>
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="link in links" :key="link.id">
                        <router-link v-if="displayDashLink(link.path.name)" :class="activeLink(link.path.name)" :to="link.path">{{ link.linkName }}</router-link>
                    </li>
                </ul>
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
            { linkId: 4, linkName: "Dashboard", path: { name: "dashboard" } },
            { linkId: 5, linkName: "FAQs", path: { name: "faqs" } },
        ])

        console.log(route.name);

        const linkClass = reactive<String[]>(["btn","btn-outline-dark"]);
        const linkActive = ref<String>("active");

        function activeLink(path: String) {
            if (route.name == path) return [...linkClass, linkActive.value];
            return linkClass;
        }

        function displayDashLink(path: String) {
            return path !== "dashboard" || localStorage.getItem('userData') !== null;
        }

        return {
            links,
            activeLink,
            displayDashLink
        }
    },
})
</script>
