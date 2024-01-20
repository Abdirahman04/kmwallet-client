<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-between bg-gradient-to-tr from-slate-600 via-slate-200 to-slate-600 px-4 py-2">
            <button class="text-lime-400 text-3xl" @click="back"><i class="fa-solid fa-arrow-left"></i></button>
            <h1 class="text-blue-700 font-extrabold font-mono text-3xl">Transfer</h1>
            <button class="text-red-500 text-3xl" @click="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
        <div class="flex flex-grow justify-center items-center">
            <div class="px-4 py-2 rounded-md shadow-lg bg-gradient-to-bl from-blue-400 via-blue-600 to-blue-400">
                <label class="block mt-2" for="balance">Enter amount</label>
                <input class="block mt-2" type="number" v-model="transferBody.balance" />
                <label class="block mt-2" for="balance">Enter recipient ID</label>
                <input class="block mt-2" type="text" v-model="transferBody.targetAccount" />
                <button class="bg-yellow-600 rounded-md py-1 mt-3 w-full text-white font-bold font-mono border-2 border-yellow-600 hover:bg-transparent hover:text-yellow-600" @click="transfer">Send</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from '@/assets/apiService'

export default defineComponent({
  components: { BackButton },
    setup() {
        const transferBody = reactive({
            accountId: "",
            transactionType: "transfer",
            targetAccount: "",
            balance: 0
        });

        const router = useRouter();

        function transfer() {
            const accountString = localStorage.getItem("accountData");
            if (accountString !== null) {
                const account = JSON.parse(accountString);
                transferBody.accountId = account.accountId;
                const path = `transaction/transfer/${account.accountId}`;
                postData(path,transferBody).then(res => {
                    if (res.ok) {
                        account.balance -= transferBody.balance;
                        localStorage.setItem("accountData", JSON.stringify(account));
                        router.push({ name: "account" });
                    }
                })
            }
        }

        function back() {
            router.push({ name: "account" });
        }

        function logout() {
            localStorage.clear();
            router.push({ name: "home" });
        }

        return {
            transferBody,
            transfer,
            back,
            logout
        }
    },
})
</script>
