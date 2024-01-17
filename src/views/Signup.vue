<template>
    <nav-bar></nav-bar>
    <div class="signup container">
        <h1>Signup</h1>
        <form>
            <label for="fname">Enter first name: </label>
            <input type="text" v-model="form.firstName" /><br>
            <label for="lname">Enter last name: </label>
            <input type="text" v-model="form.lastName" /><br>
            <label for="email">Enter email: </label>
            <input type="text" v-model="form.email" /><br>
            <label for="phone">Enter phone number: </label>
            <input type="text" v-model="form.phoneNumber" /><br>
            <password-input forName="pass" text="Enter password: " v-model="form.password" @update:value="handleUpdatePass"></password-input>
            <password-input forName="cpass" text="Confirm password: " v-model="cpass" @update:value="handleUpdateCpass"></password-input>
            <button @click="postCustomer">Send</button>
        </form>
    </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import PasswordInput from '@/components/PasswordInput.vue';
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from "vue-router"
import { postData, getData } from "@/assets/apiService"
import { signupData } from "@/types/user"

export default defineComponent({
  components: { NavBar, PasswordInput },
    setup() {
        const router = useRouter();

        const form = reactive<signupData>({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
        })
        const cpass = ref<String>("");

        function handleUpdatePass(newValue: string) {
            form.password = newValue;
        }

        function handleUpdateCpass(newValue: string) {
            cpass.value = newValue;
        }

        function postCustomer() {
            const path = "customer";
            const pathEmail = `${path}/email/${form.email}`;
            postData(path, form).then(res => {
                if (res.ok) {
                    getData(pathEmail).then(res => res.json()).then(data => {
                        localStorage.setItem("userData", JSON.stringify(data));
                        router.push({name: "home"});
                    })
                }
            })
        }

        return {
            form,
            cpass,
            handleUpdatePass,
            handleUpdateCpass,
            postCustomer
        }
    },
})
</script>
