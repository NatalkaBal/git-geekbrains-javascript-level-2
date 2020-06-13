'use strict';

const mainHeader = document.getElementById('main-header');
const mainFooter = document.getElementById('main-footer');
const goodsListSection = document.getElementById('goods-list');

const goods = [
    { title: 'Основы ООП', price: 5000, srcpath: 'img/oop.jpg'},
    { title: 'CSS', price: 8000, srcpath: 'img/css.jpg'},
    { title: 'HTML-5', price: 10000, srcpath: 'img/HTML5.jpg'},
    { title: 'JavaScript', price: 12000, srcpath: 'img/js.jpg'},
    { title: 'C++', price: 11000, srcpath: 'img/cpp-basic.jpg'},
];

const contactsArray = [
    { link: '#', img_class_fontawesome: "fab fa-facebook-square"},
    { link: '#', img_class_fontawesome: 'fab fa-twitter-square'},
    { link: '#', img_class_fontawesome: 'fab fa-instagram-square'},
    { link: '#', img_class_fontawesome: 'fab fa-vk'},
];

//заполним и выведим контакты в header
const renderContacts = (link = '#', img_class_fontawesome = 'noclass') => {
    return `<a href=${link}><i class="${img_class_fontawesome}"></i></a>`;
};

const addContact = (contacts) => {
    const contactList = contacts.map(contactItem => renderContacts(contactItem.link, contactItem.img_class_fontawesome));

    for (let elem of document.querySelectorAll('.main-contact')) {
        elem.innerHTML = contactList.join('');
    }

    mainHeader.style.display = 'flex';
    mainHeader.style.justifyContent = 'space-between';
    mainHeader.style.alignItems = 'center';

    mainFooter.style.display = 'flex';
    mainFooter.style.justifyContent = 'space-between';
    mainFooter.style.alignItems = 'center';
}

addContact(contactsArray);
/////////////////////////////////////

const renderGoodsItem = (title = 'Товар не найден', price = 'Без цены', srcpath = '#') => {
    return `<div id = "goods-item" class="goods-item"><h3>${title}</h3><img src=${srcpath} alt="img goods"><span>Цена: ${price}</span></div>`;
};

const renderGoodsList = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.srcpath));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');

    goodsListSection.style.display = 'flex';
    goodsListSection.style.flexWrap = 'wrap';
}

renderGoodsList(goods);

