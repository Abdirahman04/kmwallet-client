<template>
    <label :for="forName" class="block text-base mb-2 font-mono">{{ text }}</label>
    <input :type="passwordType" placeholder="Enter password..." v-model="internalValue" class="border w-[86%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
        <button class="px-2 py-1" @click.prevent="changePasswordVisibility">
            <i class="fa-regular" :class="eye"></i>
        </button><br>
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
        const eye = ref<string>("fa-eye-slash");

        function changePasswordVisibility() {
            if (passwordType.value === "password") {
                passwordType.value = "text";
                eye.value = "fa-eye";
            }
            else {
                passwordType.value = "password";
                eye.value = "fa-eye-slash";
            }
        }

        watch(() => internalValue.value, (newValue, oldValue) => {
            emit("update:value", newValue)
        })

        return {
            passwordType,
            eye,
            changePasswordVisibility,
            forName,
            text,
            internalValue
        }
    },
})
</script>
