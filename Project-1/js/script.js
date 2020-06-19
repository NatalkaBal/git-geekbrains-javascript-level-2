'use strict';

const mainHeader = document.getElementById('main-header');
const mainFooter = document.getElementById('main-footer');
const goodsListSection = document.getElementById('goods-list');

const contactsArray = [
    { link: '#', img_class_fontawesome: "fab fa-facebook-square"},
    { link: '#', img_class_fontawesome: 'fab fa-twitter-square'},
    { link: '#', img_class_fontawesome: 'fab fa-instagram-square'},
    { link: '#', img_class_fontawesome: 'fab fa-vk'},
];

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


        mainHeader.style.display = 'flex';
        mainHeader.style.justifyContent = 'space-between';
        mainHeader.style.alignItems = 'center';

        mainFooter.style.display = 'flex';
        mainFooter.style.justifyContent = 'space-between';
        mainFooter.style.alignItems = 'center';
    }
}

const contactlist = new contactsList();
contactlist.fetchContacts();
contactlist.render();

/////////////////////////////////////
class GoodsItem {
    constructor(title, price, srcpath) {
        this.title = title;
        this.price = price;
        this.srcpath = srcpath;
    }
    render() {
        return `
      <div id = "goods-item" class="goods-item">
        <h3>${this.title}</h3>
        <img src=${this.srcpath} alt="img goods">
        <span>Цена: ${this.price}</span>
      </div>
    `
    }
}

class GoodsList {
    constructor(){
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Основы ООП', price: 5000, srcpath: 'img/oop.jpg'},
            { title: 'CSS', price: 8000, srcpath: 'img/css.jpg'},
            { title: 'HTML-5', price: 10000, srcpath: 'img/HTML5.jpg'},
            { title: 'JavaScript', price: 12000, srcpath: 'img/js.jpg'},
            { title: 'C++', price: 11000, srcpath: 'img/cpp-basic.jpg'},
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(({ title, price, srcpath }) => {
            const goodItem = new GoodsItem(title, price, srcpath);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;

        goodsListSection.style.display = 'flex';
        goodsListSection.style.flexWrap = 'wrap';
    }
    summaGoods(){
        let sum = 0;
        this.goods.forEach(({title, price, srcpath}) => {
                sum += price;
        });
        console.log('Сумма элементов: ' + sum);
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.summaGoods();