<template>
    <div class="flex flex-col h-screen">
        <nav-bar></nav-bar>
        <div class="px-5 py-2 flex flex-col-reverse overflow-y-auto flex-grow bg-gradient-to-r from-green-800 via-lime-600 to-green-800">
            <div class="flex w-full bg-white px-4 py-2 rounded-lg mt-3">
                <input v-model="singleMessage.message" type="text" class="flex-grow border-2 bg-transparent rounded-xl mr-3 px-5" />
                <button @click.prevent="submitMessage"><i class="fa-regular fa-paper-plane"></i></button>
            </div>
            <div class="ml-4 mr-14 px-3 py-1 bg-white rounded-md my-1" v-for="message in messages" :key="message.id">
                <div>
                    <i class="fa-solid fa-user"></i>
                    <span class="text-red-600">{{ message.customerId }}</span>
                </div>
                <div>
                    <span class="text-black">{{ message.message }}</span>
                </div>
                <div class="ml-auto">
                    <span class="text-amber-500">{{ new Date(...message.timestamp).toLocaleString() }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { CommunityMessage, SendMessage } from '@/types/community'
import { getData, postData } from '@/assets/apiService'

export default defineComponent({
    components: { NavBar },
    setup() {
        const router = useRouter();

        const messages = reactive<CommunityMessage[]>([]);
        const singleMessage = reactive<SendMessage>({
            message: "",
            timestamp: "",
            customerId: ""
        })

        function getMessages() {
            const path = "community";
            getData(path).then(res => res.json()).then(data => {
                messages.push(...data);
                messages.reverse();
            })
        }

        function submitMessage() {
            const customerString = localStorage.getItem("userData");
            if (customerString !== null) {
                const customer = JSON.parse(customerString);

                singleMessage.customerId = customer.customerId;
                singleMessage.timestamp = new Date().toISOString();

                const path = "community";

                postData(path, singleMessage).then(res => {
                    if (res.ok) {
                        router.go(0);
                    }
                })
            }
        }

        onMounted(() => {
            getMessages();
        })

        return {
            messages,
            singleMessage,
            submitMessage
        }
    },
})
</script>
