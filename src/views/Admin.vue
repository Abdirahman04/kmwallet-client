<template>
    <div class="admin container">
        <h1>{{ title }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const titleRef = ref<String>("Admin");
        const title: string = titleRef as any as string;

        return { title }
    },
})
</script>
