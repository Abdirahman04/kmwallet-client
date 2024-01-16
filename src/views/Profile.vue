<template>
    <div class="container">
        <h1>Profile</h1>
        <back-button path="dashboard" btntitle="Back"></back-button>
        <form>
            <label for="fname">Enter first name: </label>
            <input type="text" v-model="form.firstName" /><br>
            <label for="lname">Enter last name: </label>
            <input type="text" v-model="form.lastName" /><br>
            <label for="email">Enter email: </label>
            <input type="text" v-model="form.email" /><br>
            <label for="phone">Enter phone number: </label>
            <input type="text" v-model="form.phoneNumber" /><br>
            <button class="btn btn-warning" @click="updateCustomer">Save</button>
            <button class="btn btn-danger" @click="deleteCustomer">Delete</button>
        </form>
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

        return{
            form,
            updateCustomer,
            deleteCustomer
        }
    },
})
</script>
