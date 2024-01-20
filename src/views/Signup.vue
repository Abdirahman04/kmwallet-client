<template>
<div class="flex flex-col h-screen">
    <nav-bar></nav-bar>
    <div class="flex flex-grow justify-center items-center bg-blue-500">
        <div class="md:m-0 m-1 md:w-[40%] w-[98%] bg-white shadow-lg rounded-md p-5">
            <h1 class="text-3xl block text-center font-semibold">
                <i class="fa-solid fa-user-plus"></i>
                Sign up
            </h1>
            <hr class="mt-3">
            <div class="mt-1">
                <label for="fname" class="block text-base font-mono">First name</label>
                <input placeholder="Enter first name..." type="text" v-model="form.firstName" class="border w-[86%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
            </div>
            <div class="mt-1">
                <label for="lname" class="block text-base font-mono">Last name</label>
                <input placeholder="Enter last name..." type="text" v-model="form.lastName" class="border w-[86%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
            </div>
            <div class="mt-1">
                <label for="email" class="block text-base font-mono">Email address</label>
                <input placeholder="Enter email..." type="text" v-model="form.email" class="border w-[86%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
            </div>
            <div class="mt-1">
                <label for="phone" class="block text-base font-mono">Phone number</label>
                <input placeholder="Enter phone number..." type="text" v-model="form.phoneNumber" class="border w-[86%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
            </div>
            <div class="mt-1">
                <password-input forName="pass" text="Password" v-model="form.password" @update:value="handleUpdatePass"></password-input>
            </div>
            <div class="mt-1">
                <password-input forName="cpass" text="Confirm password" v-model="cpass" @update:value="handleUpdateCpass"></password-input>
            </div>
            <div class="mt-5 flex">
                <div>
                    <span class="font-light">Already have an account? </span><a href="/#/login" class="text-blue-500 font-semibold">sign in</a>
                </div>
            </div>
            <div class="mt-5">
                <button @click="postCustomer" class="rounded-md py-1 w-full bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 border-2 border-blue-500">Submit</button>
            </div>
        </div>
    </div>
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
        const cpass = ref<string>("");

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
