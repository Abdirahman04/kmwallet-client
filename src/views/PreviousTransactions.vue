<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-between bg-gradient-to-tr from-slate-600 via-slate-200 to-slate-600 px-4 py-2">
            <button class="text-lime-400 text-3xl" @click="back"><i class="fa-solid fa-arrow-left"></i></button>
            <h1 class="text-blue-700 font-extrabold font-mono text-3xl">Previous Transactions</h1>
            <button class="text-red-500 text-3xl" @click="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
        <div class="flex flex-grow justify-center items-center">
            <div class="font-mono w-3/4 px-4 py-2 bg-gradient-to-tr from-slate-600 via-slate-300 to-slate-600 rounded-lg shadow-xl">
                <div class="px-3 py-1 border border-black rounded-md" v-for="transaction in transactionData" :key="transaction.transactionId">
                    <div v-if="transaction.transactionType == 'withdraw'">
                        <p>An amount of {{ transaction.balance }} was withdrawn from account {{ transaction.accountId }}</p>
                    </div>
                    <div v-else-if="transaction.transactionType == 'deposit'">
                        <p>An amount of {{ transaction.balance }} was deposited to account {{ transaction.accountId }}</p>
                    </div>
                    <div v-else>
                        <p>An amount of {{ transaction.balance }} was sent to account {{ transaction.targetAccount }}</p>
                    </div>
                </div>
                <div class="px-3 py-1 border border-black rounded-md" v-for="transaction in receivedData" :key="transaction.transactionId">
                    <div>
                        <p>An amount of {{ transaction.balance }} was received from account {{ transaction.accountId }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue'
import { defineComponent, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getData } from '@/assets/apiService'
import { Transaction } from '@/types/transactions'

export default defineComponent({
  components: { BackButton },
    setup() {
        const router = useRouter();

        const transactionData = reactive<Transaction[]>([]);

        const receivedData = reactive<Transaction[]>([]);

        function getTransactionData() {
            const accountString = localStorage.getItem("accountData");
            if (accountString !== null) {
                const account = JSON.parse(accountString);
                const path = `transaction/account/${account.accountId}`;

                getData(path).then(res => res.json()).then(data => transactionData.push(...data));
            }
        }

        function getReceivedData() {
            const accountString = localStorage.getItem("accountData");
            if (accountString !== null) {
                const account = JSON.parse(accountString);
                const path = `transaction/target/${account.accountId}`;
                
                getData(path).then(res => res.json()).then(data => receivedData.push(...data));
            }
        }

        onMounted(() => {
            getTransactionData();
            getReceivedData();
        });

        function back() {
            router.push({ name: "account" });
        }

        function logout() {
            localStorage.clear();
            router.push({ name: "home" });
        }

        return{
            transactionData,
            receivedData,
            back,
            logout
        }
        
    },
})
</script>
