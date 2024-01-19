<template>
    <div class="rounded-md shadow-md top-44 right-20 p-7 border-2 border-blue-500 bg-white" :class="displayNoneDiv">
        <form>
            <label for="accountType" class="block font-mono">Account type</label>
            <input class="px-3 py-1 mt-3 mb-2 w-full rounded-md border border-lime-400" type="text" v-model="createAccountBody.accountType">
            <button class="bg-amber-800 w-full py-1 text-white hover:bg-transparent hover:text-amber-800 border-2 border-amber-800 rounded-xl" @click="createAccount">Add</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { newAccount } from '@/types/accounts'
import { postData } from '@/assets/apiService'

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const divClass = reactive<string[]>(["fixed"]);
        const visible = ref<string>("hidden");

        const displayNoneDiv = computed(() => {
            if (!props.visible) return [...divClass,visible.value];
            else return divClass;
        });

        const createAccountBody = reactive<newAccount>({
            customerId: "",
            accountType: ""
        });

        const router = useRouter();

        function createAccount() {
            const customerData = localStorage.getItem("userData");

            if (customerData !== null) {
                const customer = JSON.parse(customerData);
                createAccountBody.customerId = customer.customerId;
                const path = "account"

                postData(path, createAccountBody).then(res => {
                    if (res.ok) router.go(0);
                    else alert("Error creating account!");
                })
            }
        }

        return {
            displayNoneDiv,
            createAccountBody,
            createAccount
        }
    },
})
</script>
