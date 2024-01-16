<template>
    <label :for="forName">{{ text }}</label>
    <input :type="passwordType" v-model="internalValue" /><button @click.prevent="changePasswordVisibility">see</button><br>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    props: {
        forName: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ""
        },
        modelValue: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const text = ref<String>(props.text);
        const forName = ref<String>(props.forName);
        const internalValue = ref<String>(props.value);

        const passwordType = ref<String>("password");

        function changePasswordVisibility() {
            if (passwordType.value === "password") passwordType.value = "text";
            else passwordType.value = "password";
        }

        watch(() => internalValue.value, (newValue, oldValue) => {
            emit("update:value", newValue)
        })

        return {
            passwordType,
            changePasswordVisibility,
            forName,
            text,
            internalValue
        }
    },
})
</script>
