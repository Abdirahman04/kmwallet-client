<template>
    <div class="container">
        <h1>Withdraw</h1>
        <back-button path="account" btntitle="Back"></back-button>
        <form>
            <label for="balance">Enter amount</label><br>
            <input type="number" v-model="transferBody.balance" /><br>
            <label for="balance">Enter recipient ID</label><br>
            <input type="text" v-model="transferBody.targetAccount" /><br>
            <button class="btn btn-info" @click="transfer">Transfer</button>
        </form>
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

        return {
            transferBody,
            transfer,
        }
    },
})
</script>
