<template>
    <div class="container">
        <h1>Account</h1>
        <h2>ID: {{ account.accountId }}</h2>
        <h3 class="text-danger">Balance: {{ account.balance }}</h3>
        <button class="btn btn-danger" @click="back">Back</button><br>
        <back-button path="deposit" btntitle="Deposit"></back-button>
        <back-button path="withdraw" btntitle="Withdraw"></back-button>
        <back-button path="transfer" btntitle="Transfer"></back-button><br>
        <back-button path="previoustransactions" btntitle="Previous transactions"></back-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Account } from '@/types/accounts'
import BackButton from '@/components/BackButton.vue';

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

        onMounted(() => {
            const accountData = localStorage.getItem("accountData");
            if (accountData !== null) {
                const accountLock = JSON.parse(accountData);
                account.accountId = accountLock.accountId;
                account.customerId = accountLock.customerId;
                account.accountType = accountLock.accountType;
                account.balance = accountLock.balance;
            }
        })

        function back() {
            localStorage.setItem("accountData", "");
            router.push({ name: "dashboard" });
        }

        return {
            back,
            account
        }
    },
})
</script>
