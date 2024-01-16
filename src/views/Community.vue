<template>
    <div class="container">
        <nav-bar></nav-bar>
        <h1>Community</h1>
        <div class="card" v-for="message in messages" :key="message.id">
            <div class="card-body">
                <div class="card-title">{{ message.customerId }}</div>
                <div class="card-text">
                    <h5>{{ message.message }}</h5>
                    <p>{{ new Date(...message.timestamp).toLocaleString() }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { CommunityMessage } from '@/types/community'
import { getData } from '@/assets/apiService'

export default defineComponent({
    components: { NavBar },
    setup() {
        const messages = reactive<CommunityMessage[]>([]);

        function getMessages() {
            const path = "community";
            getData(path).then(res => res.json()).then(data => {
                messages.push(...data);
            })
        }

        onMounted(() => {
            getMessages();
        })

        return {
            messages,
        }
    },
})
</script>
