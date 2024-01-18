<template>
<div class="flex flex-col h-screen">
    <nav-bar></nav-bar>
    <div class="flex flex-grow justify-center items-center bg-indigo-800">
        <div class="md:m-0 m-1 w-96 md:p-6 p-7 shadow-lg bg-white rounded-md">
            <h1 class="text-3xl block text-center font-semibold">
                <i class="fa-solid fa-user"></i>
                Login
            </h1>
            <hr class="mt-3">
            <div class="mt-3">
                <label for="email" class="block text-base mb-2 font-mono">Email address</label>
                <input placeholder="Enter email..." type="text" v-model="loginUser.email" class="border w-[86%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
            </div>
            <div class="mt-3">
                <password-input forName="pass" text="Password" v-model="loginUser.password" @update:value="handleUpdate"></password-input>
            </div>
            <div class="mt-3 flex justify-between items-center">
                <div>
                    <input type="checkbox" />
                    <label>Remember me</label>
                </div>
                <div>
                    <a href="#" class="text-indigo-800 font-semibold">Forgot password?</a>
                </div>
            </div>
            <div class="mt-5">
                <button class="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded hover:bg-transparent hover:text-indigo-700 font-semibold" @click="login">Login</button>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginData } from '@/types/user'
import { getData } from '@/assets/apiService'

export default defineComponent({
  components: { NavBar, PasswordInput },
    setup() {
        const router = useRouter();

        const loginUser = reactive<loginData>({
            email: "",
            password: ""
        })

       function handleUpdate(newValue: string) {
            loginUser.password = newValue;
       }

       function login() {
        const path = `customer/email/${loginUser.email}`;

        getData(path).then(res => res.json()).then(data => {
            if (data.password !== loginUser.password) alert("Wrong password!");
            else {
                localStorage.setItem("userData", JSON.stringify(data));
                router.push({ name: "home" });
            }
        })
       }

       return {
            loginUser,
            handleUpdate,
            login
       }
    },
})
</script>
