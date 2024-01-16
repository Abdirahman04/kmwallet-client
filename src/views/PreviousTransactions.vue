<template>
    <div class="container">
        <h1>Previous Transactions</h1>
        <back-button path="account" btntitle="Back"></back-button>
        <div class="card" v-for="transaction in transactionData" :key="transaction.transactionId">
            <div class="card-body">
                <div class="card-title">{{ transaction.transactionId }}</div>
                <div class="card-text">
                    <p v-if="transaction.transactionType == 'withdraw'">An amount of {{ transaction.balance }} was withdrawn from account {{ transaction.accountId }}</p>
                    <p v-else-if="transaction.transactionType == 'deposit'">An amount of {{ transaction.balance }} was deposited to account {{ transaction.accountId }}</p>
                    <p v-else>An amount of {{ transaction.balance }} was sent to account {{ transaction.targetAccount }}</p>
                </div>
            </div>
        </div>
        <div class="card" v-for="transaction in receivedData" :key="transaction.transactionId">
            <div class="card-body">
                <div class="card-title">{{ transaction.transactionId }}</div>
                <div class="card-text">
                    <p>An amount of {{ transaction.balance }} was received from account {{ transaction.accountId }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue'
import { defineComponent, reactive, onMounted } from 'vue'
import { getData } from '@/assets/apiService'
import { Transaction } from '@/types/transactions'

export default defineComponent({
  components: { BackButton },
    setup() {
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

        return{
            transactionData,
            receivedData
        }
        
    },
})
</script>
