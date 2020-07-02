'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div v-if="goods.length !== 0" class="goods-list">
            <goods-item class="goods-item" v-for="good in goods" :key="good.id_product" :good="good"></goods-item>
        </div>
        <div v-else class="goods-list">
            <span>Нет данных</span>
        </div>
    `
})

Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <span>Цена: {{ good.price }}</span>
            <button class="buy-btn" v-on:click="addProduct(good)" >Добавить в корзину</button>
        </div>
    `
});

Vue.component('basket', {
    props: ['basket'],
    template: `     
        <table  v-if="basket.length !== 0" class="basket-list">
        <h3>Корзина</h3>
            <tr class="titel-tbl">
                <td>Товар</td>
                <td>Цена</td>
                <td></td>
            </tr>
            <tr v-for="el_basket in basket" :key="el_basket.id_product" :basket="el_basket">
                <td>{{ el_basket.product_name }}</td>
                <td>{{ el_basket.price }}</td>
                <td><a class="del-btn" @click="deleteProduct(el_basket)">x</a></td>
            </tr>
            <tr class="titel-tbl">
                <td>Cумма товара</td>
                <td>{{sumGood}}</td>
                <td></td>
            </tr>
        </table>
        <table v-else><h3>Корзина пуста</h3></table>
    `
});

let app = new Vue ({
    el: '#app',

    data: {
        goods: [],
        filteredGoods: [],
        basket: [],
        searchLine: '',
        searchText: '',
        sumGood: ''
    },

    methods: {

        makeGETRequest(url, callback) {
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        callback(xhr.responseText);
                    }
                }
                xhr.open('GET', url, true);
                xhr.send();
         });
        },

        addProduct1(good) {
            this.basket.push(good);
            },

        deleteProduct (good){
            this.basket = this.basket.filter(item => item !== good);
        },

        filterGoods () {
            let text = this.searchLine.toLowerCase().trim();
            if (text === '') {
                this.filteredGoods = this.goods;
            } else {
                this.filteredGoods = this.goods.filter((el) => {
                    return el.product_name.toLowerCase().includes(text);
                });
            }
        },

        clearfilterGoods(){
            this.filteredGoods = this.goods;
            this.searchLine = '';
        }
    },

    computed: {
        sumGoods: function () {
            let sum = 0;
            this.basket.forEach(({price}) => {
                sum += price;
            });
            return this.sumGood = sum;
        }
    },

    mounted () {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
    }
});

/////////////////////////////////////
//заполним и выведим контакты в header
const contactsArray = [
    { link: '#', img_class_fontawesome: "fab fa-facebook-square"},
    { link: '#', img_class_fontawesome: 'fab fa-twitter-square'},
    { link: '#', img_class_fontawesome: 'fab fa-instagram-square'},
    { link: '#', img_class_fontawesome: 'fab fa-vk'},
];

const renderContacts = (link = '#', img_class_fontawesome = 'noclass') => {
    return `<a href=${link}><i class="${img_class_fontawesome}"></i></a>`;
};

const addContact = (contacts) => {
    const contactList = contacts.map(contactItem => renderContacts(contactItem.link, contactItem.img_class_fontawesome));

    for (let elem of document.querySelectorAll('.main-contact')) {
        elem.innerHTML = contactList.join('');
    }

}

addContact(contactsArray);
/////////////////////////////////////
