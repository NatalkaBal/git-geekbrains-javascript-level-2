'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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

        sumGoods(){
            let sum = 0;
            this.basket.forEach(({price}) => {
                sum += price;
            });
            this.sumGood = sum;
        },

        addProduct (good) {
            this.basket.push(good);
            this.sumGoods();
        },

        deleteProduct (good){
            this.basket = this.basket.filter(item => item !== good);
            this.sumGoods();
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
