<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-between bg-gradient-to-tr from-slate-600 via-slate-200 to-slate-600 px-4 py-2">
            <button class="text-lime-400 text-3xl" @click="back"><i class="fa-solid fa-arrow-left"></i></button>
            <h1 class="text-blue-700 font-extrabold font-mono text-3xl">Account</h1>
            <button class="text-red-500 text-3xl" @click="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
        <div class="flex flex-grow justify-center mt-5">
            <div class="rounded-2xl flex flex-col items-center w-1/2 bg-gradient-to-br from-slate-500 via-lime-400 to-purple-400 border border-black shadow-lg px-5 py-2">
                <div class="mt-10 mb-4 flex flex-col w-3/5 bg-gradient-to-tr from-red-400 to-red-700 h-44 rounded-xl px-5 py-5">
                    <h2 class="text-center text-xl font-mono font-extrabold">{{ account.accountId }}</h2>
                    <div class="flex justify-between px-10 mt-8">
                        <span class="text-lg font-bold">Balance: </span>
                        <span class="text-lg font-mono font-bold">{{ account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
                    </div>
                </div>
                <div class="flex justify-between text-2xl px-1 w-1/2 mt-4">
                    <button class="bg-black text-white rounded-full px-4 py-1" @click="goTo('deposit')"><i class="fa-solid fa-plus"></i></button>
                    <button class="bg-black text-white rounded-full px-4 py-1" @click="goTo('withdraw')"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="bg-black text-white rounded-full px-4 py-1" @click="goTo('transfer')"><i class="fa-solid fa-location-arrow"></i></button>
                </div>
                <div class="bg-white mt-3 px-3 py-1 border rounded-sm w-3/4" v-if="previousTransactions.length !== 0">
                    <div class="p-1 mt-2 border border-black" v-for="transaction in previousTransactions" :key="transaction.transactionId">
                        <div>{{ transaction.transactionId }}</div>
                        <div>{{ transaction.transactionType }}</div>
                        <div>{{ transaction.balance }}</div>
                    </div>
                    <div class="flex justify-center items-center">
                        <button class="absolute bottom-4 px-2 rounded-xl border border-black hover:bg-black hover:text-white" @click="goTo('previoustransactions')">Show more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Account } from '@/types/accounts'
import { Transaction } from '@/types/transactions'
import BackButton from '@/components/BackButton.vue';
import { getData } from '@/assets/apiService'

export default defineComponent({
  components: { BackButton },
    setup() {
        const router = useRouter();

        const account = reactive<Account>({
            accountId: "",
            customerId: "",
            accountType: "",
            balance: 0
        })

        const previousTransactions = reactive<Transaction[]>([]);

        function getSampleTransactions(arr: Array<Transaction>) {
            if (arr.length >= 3) {
                for (let i = 0; i < 3; i++) {
                    previousTransactions.push(arr[i]);
                }
            }
            else {
                for (const tran of arr) {
                    previousTransactions.push(tran);
                }
            }
        }

        console.log(previousTransactions);

        onMounted(() => {
            const accountData = localStorage.getItem("accountData");
            if (accountData !== null) {
                const accountLock = JSON.parse(accountData);
                const path = `account/${accountLock.accountId}`;
                getData(path).then(res => res.json()).then(data => {
                    account.accountId = data.accountId;
                    account.customerId = data.customerId;
                    account.accountType = data.accountType;
                    account.balance = data.balance;
                    
                    getSampleTransactions(data.transactions);
                })
            }
        })

        function back() {
            localStorage.setItem("accountData", "");
            router.push({ name: "dashboard" });
        }

        function logout() {
            localStorage.clear();
            router.push({ name: "home" });
        }

        function goTo(str: string) {
            router.push({ name: str });
        }

        return {
            back,
            account,
            logout,
            goTo,
            previousTransactions
        }
    },
})
</script>
