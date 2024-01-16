<template>
    <div class="container">
        <h1>Dashboard</h1>
        <h2>Welcome, {{ user.firstName }} {{ user.lastName }}</h2>
        <button class="btn btn-info" @click="backBtn">&lt;</button>
        <button class="btn btn-danger" @click="logout">logout</button>
        <button class="btn btn-warning" @click="addAccountBtn">Add +</button>
        <button class="btn btn-primary" @click="goToProfile">Profile</button>
        <div class="container">
            <div class="card" v-for="account in accounts" :key="account.accountId" @click="goToAccount(account)">
                <div class="card-body">
                    <div class="card-title">{{ account.accountId }}</div>
                    <div class="card-text">
                        <ul>
                            <li>Account type: {{account.accountType}}</li>
                            <li>Balance: {{ account.balance }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <new-account-form :visible="visible"></new-account-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userData } from '@/types/user'
import { Account } from '@/types/accounts'
import { getData } from '@/assets/apiService'
import NewAccountForm from '@/components/NewAccountForm.vue'

export default defineComponent({
    components: {
        NewAccountForm
    },
    setup() {
        const router = useRouter();
        const user = reactive<userData>({
            customerId: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: ""
        });

        let visible = ref<boolean>(false);

        function addAccountBtn() {
            visible.value = !visible.value;
        }

        const accounts = reactive<Account[]>([]);

        function backBtn() {
            router.push({ name: 'home' });
        }

        function logout() {
            localStorage.clear();
            backBtn();
        }

        function goToProfile() {
            router.push({ name: "profile" });
        }

        function getUserData() {
            const userDataString = localStorage.getItem("userData");
            
            if (userDataString !== null) {
                const userData = JSON.parse(userDataString);

                user.customerId = userData.customerId;
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.email = userData.email;
                user.phoneNumber = userData.phoneNumber;
                user.password = userData.password;
            }
        }

        function getUserAccounts() {
            const path = `customer/account/${user.customerId}`;
            getData(path).then(res => res.json()).then(data => {
                accounts.push(...data);
            })
        }

        onMounted(() => {
            getUserData();
            getUserAccounts();
        })

        function goToAccount(account: Account) {
            localStorage.setItem("accountData", JSON.stringify(account));
            router.push({ name: "account" });
        }

        return {
            backBtn,
            user,
            logout,
            accounts,
            addAccountBtn,
            visible,
            goToAccount,
            goToProfile
        }
    },
})
</script>
