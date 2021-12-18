<template>
    <div class="typer-container">
        <div class="">
            <h1>This is the text that you should type out</h1>
            <p>{{text}}</p>
        </div>
        <div class="input-container">
            <h1>This is the input</h1>
            <form v-on:keydown.space="nextWord">
                <input type="text" v-model="input" >
            </form>
            <p>{{result}}</p>
            <p>{{currentWord}}</p>
            <p>{{counter}} </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Typer',
    components: {},
    computed: {
        result: function () {
            return this.input
        },
        currentWord: function() {
            const words = this.text.split(" ") 
            return words[this.counter]
        }
    },
    data: function(){
        return {
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores ipsam sequi, quis minus architecto temporibus nihil officiis quisquam nisi laudantium doloremque voluptatibus laborum est, aspernatur ratione quibusdam. Asperiores, natus corporis!",
            input: "",
            counter: 0,
        }
    },
    methods: {
        nextWord(e) {
            e.preventDefault()
            if(this.input == this.currentWord) {
                this.counter++
                this.input = ""
            }
        }
    }
}
</script>