<template>
    <div class="container">
        <h1>Withdraw</h1>
        <back-button path="account" btntitle="Back"></back-button>
        <form>
            <label for="balance">Enter amount</label><br>
            <input type="number" v-model="withdrawBody.balance" /><br>
            <button class="btn btn-info" @click="withdraw">Withdraw</button>
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

        return {
            withdrawBody,
            withdraw,
        }
    },
})
</script>
