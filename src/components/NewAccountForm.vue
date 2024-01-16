<template>
    <div :class="displayNoneDiv">
        <form>
            <label for="accountType">Account type</label><br>
            <input type="text" v-model="createAccountBody.accountType"><br>
            <button class="btn btn-warning" @click="createAccount">Add</button>
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
        const divClass = reactive<string[]>(["container","position-fixed","top-3","end-3","vw-25","vh-25","bg-light"]);
        const visible = ref<string>("d-none");

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
