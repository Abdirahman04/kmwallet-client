<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-between bg-black px-10 py-3">
            <button @click="goBack"><i class="text-white fa-solid fa-arrow-left"></i></button>
            <h1 class="font-mono font-bold text-3xl text-white">Profile</h1>
            <button @click="logout"><i class="text-white fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
        <div class="flex flex-grow px-12 items-center">
            <div class="px-4 py-2 bg-white border-2 border-yellow-600 rounded-md w-1/2">
                <div class="mt-3">
                    <label class="block text-lg" for="fname">First name</label>
                    <input class="block mt-2 text-xl font-serif font-bold" type="text" v-model="form.firstName" />
                    <hr>
                </div>
                <div class="mt-3">
                    <label class="block text-lg" for="lname">Last name</label>
                    <input class="block mt-2 text-xl font-serif font-bold" type="text" v-model="form.lastName" />
                    <hr>
                </div>
                <div class="mt-3">
                    <label class="block text-lg" for="email">Email address</label>
                    <input class="block mt-2 text-xl font-serif font-bold" type="text" v-model="form.email" />
                    <hr>
                </div>
                <div class="mt-3">
                    <label class="block text-lg" for="phone">Phone number</label>
                    <input class="block mt-2 text-xl font-serif font-bold" type="text" v-model="form.phoneNumber" />
                    <hr>
                </div>
                <div class="mt-4 flex justify-between px-3 gap-5">
                    <div><button class="bg-green-500 px-16 py-1.5 rounded-lg font-mono font-bold" @click="updateCustomer">Save</button></div>
                    <div><button class="bg-red-500 px-16 py-1.5 rounded-lg font-mono font-bold" @click="deleteCustomer">Delete</button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue'
import { defineComponent, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { putData,deleteData } from '@/assets/apiService'

export default defineComponent({
  components: { BackButton },
    setup() {
        const router = useRouter();

        const form = reactive({
            customerId: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: ""
        });

        function getFormData() {
            const customerString = localStorage.getItem("userData");
            if (customerString !== null) {
                const customer = JSON.parse(customerString);
                form.customerId = customer.customerId;
                form.firstName = customer.firstName;
                form.lastName = customer.lastName;
                form.email = customer.email;
                form.phoneNumber = customer.phoneNumber;
                form.password = customer.password;
            }
        }

        onMounted(() => {
            getFormData();
        })

        function updateCustomer() {
            const path = `customer/${form.customerId}`;
            putData(path,form).then(res => {
                if (res.ok) {
                    localStorage.setItem("userData", JSON.stringify(form));
                    router.go(0);
                }
            })
        }

        function deleteCustomer() {
            let ans = confirm("Are you sure you want to delete your customer account?");
            if(ans) {
                const path = `customer,${form.customerId}`;
                deleteData(path).then(res => {
                    if (res.ok) {
                        localStorage.clear();
                        router.push({ name: "home" });
                    }
                })
            }
        }

        function goBack() {
            router.push({ name: "dashboard" });
        }

        function logout() {
            localStorage.clear();
            router.push({ name: "home" });
        }

        return{
            form,
            updateCustomer,
            deleteCustomer,
            goBack,
            logout
        }
    },
})
</script>
