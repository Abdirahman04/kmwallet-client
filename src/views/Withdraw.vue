<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-between bg-gradient-to-tr from-slate-600 via-slate-200 to-slate-600 px-4 py-2">
            <button class="text-lime-400 text-3xl" @click="back"><i class="fa-solid fa-arrow-left"></i></button>
            <h1 class="text-blue-700 font-extrabold font-mono text-3xl">Withdraw</h1>
            <button class="text-red-500 text-3xl" @click="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
        <div class="flex flex-grow justify-center items-center">
            <div class="px-4 py-2 rounded-md shadow-lg bg-gradient-to-bl from-blue-400 via-blue-600 to-blue-400">
                <label class="block mt-2" for="balance">Enter amount</label>
                <input class="block mt-2" type="number" v-model="withdrawBody.balance" />
                <button class="bg-yellow-600 rounded-md py-1 mt-3 w-full text-white font-bold font-mono border-2 border-yellow-600 hover:bg-transparent hover:text-yellow-600" @click="withdraw">Withdraw</button>
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
        const withdrawBody = reactive({
            accountId: "",
            transactionType: "withdraw",
            balance: 0
        });

        const router = useRouter();

        function withdraw() {
            const accountString = localStorage.getItem("accountData");
            if (accountString !== null) {
                const account = JSON.parse(accountString);
                withdrawBody.accountId = account.accountId;
                const path = `transaction/withdraw/${account.accountId}`;
                postData(path,withdrawBody).then(res => {
                    if (res.ok) {
                        account.balance -= withdrawBody.balance;
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
            withdrawBody,
            withdraw,
            back,
            logout
        }
    },
})
</script>
