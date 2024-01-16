<template>
    <div class="card px-5">
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">
                <span>{{ title }}</span>
                <button class="btn btn-outline-primary ml-auto" @click="displayText">{{ sign }}</button>
            </h5>
            <div :class="textClass">{{ text }}</div>
        </div>
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
        const sign = ref<string>("+");

        const textClass = ref<string[]>(["card-text","d-none"]);

        function displayText() {
            if (sign.value == "+") {
                textClass.value.pop();
                sign.value = "-";
            }
            else {
                textClass.value.push("d-none");
                sign.value = "+";
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
