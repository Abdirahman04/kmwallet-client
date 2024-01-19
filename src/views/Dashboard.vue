<template>
    <div class="flex flex-col h-screen">
        <div class="w-full flex justify-between items-center mx-auto bg-amber-950 px-32 py-2">
            <button @click="backBtn"><i class="fa-solid fa-house"></i></button>
            <h1 class="text-3xl font-semibold text-cyan-500">Dashboard</h1>
            <button class="font-bold rounded-md bg-red-600 text-white px-4 py-1 hover:bg-transparent hover:text-red-600 border-2 border-red-600" @click="logout">logout</button>
        </div>
        <div class="flex flex-col flex-grow bg-slate-300 p-5">
            <h2 class="text-lime-900 text-2xl m-3 font-bold">Welcome, {{ user.firstName }} {{ user.lastName }}</h2>
            <button class="w-24 rounded-lg bg-blue-600 text-white border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 px-3 py-1 font-semibold" @click="goToProfile">Profile</button>
            <div>
                <div class="w-1/2 bg-lime-300 mt-3 px-7 py-2 rounded-md shadow-md border border-black" v-for="account in accounts" :key="account.accountId" @click="goToAccount(account)">
                    <div class="font-serif font-extrabold text-xl">{{ account.accountId }}</div>
                    <div class="flex justify-between">
                        <span class="text-slate-700 font-bold text-lg">{{account.accountType}}</span>
                        <span class="font-semibold font-mono text-red-700">{{ account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
                    </div>
                </div>
                <div @click="addAccountBtn" class="flex justify-between w-1/2 bg-lime-300 mt-3 px-7 py-2 rounded-md shadow-md border border-black">
                    <span class="font-thin font-serif text-xl">Add account</span>
                    <span class="text-xl"><i class="fa-solid fa-plus"></i></span>
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
