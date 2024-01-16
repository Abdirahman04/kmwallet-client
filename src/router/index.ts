import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from "../views/Home.vue"
import Admin from "../views/Admin.vue"
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"
import FAQs from "../views/FAQs.vue"
import Dashboard from "../views/Dashboard.vue"
import Account from "../views/Account.vue"
import Deposit from "../views/Deposit.vue"
import Withdraw from "../views/Withdraw.vue"
import Transfer from "../views/Transfer.vue"
import PreviousTransactions from "../views/PreviousTransactions.vue"
import Profile from "../views/Profile.vue"

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: Home },
  { path: "/admin", name: "admin", component: Admin },
  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/faqs", name: "faqs", component: FAQs },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/account", name: "account", component: Account },
  { path: "/account/deposit", name: "deposit", component: Deposit },
  { path: "/account/withdraw", name: "withdraw", component: Withdraw },
  { path: "/account/transfer", name: "transfer", component: Transfer },
  { path: "/account/previoustransactions", name: "previoustransactions", component: PreviousTransactions },
  { path: "/profile", name: "profile", component: Profile },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
