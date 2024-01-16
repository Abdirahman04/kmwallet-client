<template>
    <div class="container">
        <h1>Deposit</h1>
        <back-button path="account" btntitle="Back"></back-button>
        <form>
            <label for="balance">Enter amount</label><br>
            <input type="number" v-model="depositBody.balance" /><br>
            <button class="btn btn-info" @click="deposit">Deposit</button>
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
        const depositBody = reactive({
            accountId: "",
            transactionType: "deposit",
            balance: 0
        });

        const router = useRouter();

        function deposit() {
            const accountString = localStorage.getItem("accountData");
            if (accountString !== null) {
                const account = JSON.parse(accountString);
                depositBody.accountId = account.accountId;
                const path = `transaction/deposit/${account.accountId}`;
                postData(path,depositBody).then(res => {
                    if (res.ok) {
                        account.balance += depositBody.balance;
                        localStorage.setItem("accountData", JSON.stringify(account));
                        router.push({ name: "account" });
                    }
                })
            }
        }

        return {
            depositBody,
            deposit,
        }
    },
})
</script>
