<template>
    <button class="btn btn-info" @click="goBack(path)">{{ title }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    props: {
        path: {
            type: String,
            required: true
        },
        btntitle: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();

        function goBack(path: string) {
            router.push({ name: path })
        }

        return {
            goBack,
            title: props.btntitle,
            path: props.path
        }
    },
})
</script>
