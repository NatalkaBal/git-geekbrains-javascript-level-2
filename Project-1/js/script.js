'use strict';

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
