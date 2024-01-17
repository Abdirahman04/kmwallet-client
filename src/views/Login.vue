<template>
    <nav-bar></nav-bar>
    <div class="login container">
        <h1>Login</h1>
        <form>
            <label for="email">Enter email: </label>
            <input type="text" v-model="loginUser.email" /><br>
            <password-input forName="pass" text="Enter password: " v-model="loginUser.password" @update:value="handleUpdate"></password-input>
            <button class="btn" @click="login">Send</button>
        </form>
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
