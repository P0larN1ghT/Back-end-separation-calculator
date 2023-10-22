<template>
    <div id="calculator">
        <section class="calculator" id="calculator">
            <calculator-content @change="change" @getNum="getNum"></calculator-content>
        </section>
        <div class="box-list">
            <div @click="getNum" class="history">历史记录</div>
            <div v-for="(item, index) in list" :key="index">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
import CalculatorContent from "components/CalculatorContent.vue";
import { useListeners } from "vue";
import axios from "axios";

export default {
    name: "calculator",
    components: {
        CalculatorContent,
    },
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.getNum();
    },
    methods: {
        change(val) {
            console.log(val);
            // this.getNum();
            this.setNum(val)
            // this.list.push(val);
        },
        getNum() {
            this.list = []
            axios
                .get("/num")
                .then((response) => {
                    // 在这里处理请求成功的数据
                    console.log('--------------后台数据---------------')
                    console.log(response.data.result);
                    this.list = response.data.result.map((item) => {
                        return item.val;
                    });
                })
                .catch((error) => {
                    // 在这里处理请求错误
                    console.error(error);
                });
        },
        setNum(val) {
            axios
                .post("/num", {val})
                .then((response) => {
                    // 在这里处理请求成功的数据
                    console.log('???')
                    this.getNum()
                })
                .catch((error) => {
                    // 在这里处理请求错误
                    console.error(error);
                });
        },
    },
};
</script>

<style>
.box-list {
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 10px;
    width: 220px;
    height: 600px;
    background-color: #ccc;

}
.history{
        width: 80%;
    height: 24px;
    background: #5584ff;
    margin-left: 10%;
    border-radius: 16px;
    text-align: center;
    line-height: 24px;
    font-size: 16px;
    color: #fff;
    cursor: pointer
    }

@import url("https://fonts.googleapis.com/css?family=Pacifico");

html {
    font-size: 62.5%; /* =10px */
}

body {
    background-color: #f4f1f1; /* HEX */
}

header {
    font-size: 1.8rem;
    font-family: "Pacifico", cursive;
}

header .author {
    font-size: 1.5rem;
}

header .author a {
    text-decoration: none;
}

header,
.calculator {
    margin: 2.5rem auto;
    text-align: center;
}

.calculator {
    border: 0.8rem solid #f67373;
    width: 40rem;
    height: 48rem;
    background-color: #f28080;
    font-size: 1.6rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    -ms-border-radius: 1rem;
    -o-border-radius: 1rem;
    border-radius: 1rem;
    :-webkit-box-shadow: 1rem 1rem 0.5rem #ccc;
    box-shadow: 1rem 1rem 0.5rem #ccc;
}
</style>
