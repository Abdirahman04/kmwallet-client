<template>                
    <header class="bg-slate-600 text-white py-1 z-10">
        <nav class="flex justify-between items-center w-[88%] mx-auto">
            <div><img class="h-12" src="../assets/cooltext450867828282349.png" alt="..."></div>
            <div :class="navPos" class="bg-slate-600 absolute md:static md:min-h-fit min-h-[44vh] left-0 md:w-auto w-full flex items-center px-5">
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li v-for="link in links" :key="link.id">
                        <router-link class="hover:text-yellow-200 font-serif font-extrabold" v-if="displayDashLink(link.path.name)" :to="link.path">{{ link.linkName }}</router-link>
                    </li>
                </ul>
            </div>
            <div>
                <ion-icon @click="onToggleMenu()" :name="iconName" class="text-3xl cursor-pointer md:hidden"></ion-icon>
            </div>
        </nav>
    </header>
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

        const iconName = ref<string>("menu-outline");
        const navPos = ref<string>("top-[-100%]");

        function displayDashLink(path: String) {
            return (path !== "dashboard" && path !== "community") || localStorage.getItem('userData') !== null;
        }

        function onToggleMenu() {
            if (iconName.value === "menu-outline") {
                iconName.value = "close-outline";
                navPos.value = "top-12"
            }
            else {
                iconName.value = "menu-outline"
                navPos.value = "top-[-100%]"
            }
        }

        return {
            links,
            displayDashLink,
            onToggleMenu,
            iconName,
            navPos
        }
    },
})
</script>
