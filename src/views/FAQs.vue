<template>
    <div class="container">
        <nav-bar></nav-bar>
        <h1>FAQs</h1>
        <quiz-card
            quizTitle="How do I open an account with kmwallet?"
            quizText="To open an account with kmwallet, you first need to login, or sign up if you have not already. After that go to the page called 'dashboard'. There you will see a button called 'Add' followed by a plus sign. After clicking the button you will be asked to enter the type of account you want. When you press add, your account will be created."
        ></quiz-card>
        <quiz-card
            quizTitle="What types of accounts do you offer?"
            quizText="We offer a range of accounts, including savings accounts, checking accounts, and special accounts designed to meet various financial needs. Explore our website for detailed information on each account type."
        ></quiz-card>
        <quiz-card
            quizTitle="What are the online banking features available to customers?"
            quizText="Our online banking platform provides a variety of features, including real-time account balance checks, fund transfers between accounts, cash deposits and withdrawals. You can manage your finances conveniently from anywhere with internet access."
        ></quiz-card>
        <quiz-card
            quizTitle="How do i reset my password?"
            quizText="If you need to reset your password, click on the 'Forgot Password' link on the login page. Follow the prompts to verify your identity, and you'll be able to set up a new password securely."
        ></quiz-card>
        <quiz-card
            quizTitle="Is online banking with kmwallet secure"
            quizText="Yes, your security is our top priority. We use advanced encryption technologies, multi-factor authentication, and regularly conduct security audits to ensure the confidentiality and integrity of your information."
        ></quiz-card>
        <quiz-card
            quizTitle="Are my personal and financial details safe with your bank?"
            quizText="Absolutely. We employ strict privacy policies and security measures to safeguard your personal and financial information. Rest assured that your data is treated with the utmost confidentiality."
        ></quiz-card>
        <quiz-card
            quizTitle="Can i update my personal information?"
            quizText="Yes, you can update your personal information by simply going to your profile and editing any information you want to change then click the save button."
        ></quiz-card>
    </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import QuizCard from '@/components/QuizCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { NavBar, QuizCard },
    setup() {
        
    },
})
</script>
