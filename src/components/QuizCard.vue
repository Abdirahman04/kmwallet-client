<template>
    <div class="text-gray-300">
        <div class="flex">
            <span class="border border-gray-900 p-1 my-1 rounded-md font-semibold">{{ title }}</span>
            <button class="border border-black px-2 ml-auto" @click="displayText"><i class="fa-solid" :class="sign"></i></button>
        </div>
        <div class="border border-gray-900 p-1 mr-10" :class="textClass">{{ text }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        quizTitle: {
            type: String,
            required: true
        },
        quizText: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const sign = ref<string>("fa-plus");

        const textClass = ref<string[]>(["whitespace-normal","hidden"]);

        function displayText() {
            if (sign.value == "fa-plus") {
                textClass.value.pop();
                sign.value = "fa-minus";
            }
            else {
                textClass.value.push("hidden");
                sign.value = "fa-plus";
            }
        }

        return {
            title: props.quizTitle,
            text: props.quizText,
            sign,
            textClass,
            displayText
        }
    },
})
</script>
