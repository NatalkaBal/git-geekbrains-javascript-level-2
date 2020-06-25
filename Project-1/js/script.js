'use strict';

const mainHeader = document.getElementById('main-header');
const mainFooter = document.getElementById('main-footer');
const goodsListSection = document.getElementById('goods-list');

class contactsItem {
    constructor(link, img_class_fontawesome) {
        this.link = link;
        this.img_class_fontawesome = img_class_fontawesome;
    }
    render() {
        return `<a href=${this.link}><i class="${this.img_class_fontawesome}"></i></a>`
    }
}

class contactsList {
    constructor(){
        this.contactsArray = [];
    }
    fetchContacts() {
        this.contactsArray = [
            { link: '#', img_class_fontawesome: "fab fa-facebook-square"},
            { link: '#', img_class_fontawesome: 'fab fa-twitter-square'},
            { link: '#', img_class_fontawesome: 'fab fa-instagram-square'},
            { link: '#', img_class_fontawesome: 'fab fa-vk'},
        ];
    }
    render() {
        let listHtml = '';
        this.contactsArray.forEach(({ link, img_class_fontawesome }) => {
            const contactItem = new contactsItem(link, img_class_fontawesome);
            listHtml += contactItem.render();
        });
        for (let elem of document.querySelectorAll('.main-contact')) {
            elem.innerHTML = listHtml;
        }

    }
}

const contactlist = new contactsList();
contactlist.fetchContacts();
contactlist.render();

/////////////////////////////////////

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {

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
};

class GoodsItem {
    constructor(id_product, product_name, price) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
    }
    render() {
        return `
        <div id = "goods-item" class="goods-item">
            <h3>${this.product_name}</h3>
            <span>Цена: ${this.price}</span>
            <button id = "'btd_${this.id_product}" >Добавить в корзину</button>
        </div>
        `
    }
}

    class GoodsList {
        constructor() {
            this.goods = [];
        }
        fetchGoods(cb) {
            makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
                cb();
            })
        }
        render() {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml;
        }

        sumGoods(){
            let sum = 0;
            this.goods.forEach(({title, price, srcpath}) => {
                sum += price;
            });
            console.log('Сумма элементов: ' + sum);
        }

    }

    const list = new GoodsList();
    list.fetchGoods(() => {
        list.render();
    });


