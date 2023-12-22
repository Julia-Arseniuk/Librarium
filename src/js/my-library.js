import ApiService from "./api";

import { myLibList } from '../templates/my-library-list';
import { AllLibList } from '../templates/all-library-list';
import { singleInfo } from "../templates/single";

import imageURL from '../img/no-image-found.png';

// - refs

// const form = document.querySelectorAll('form');
const result = document.querySelector('.result-lib');
const bookshelves = document.querySelectorAll('.bookshelves');

// - localStorage

let queueArray = JSON.parse(localStorage.getItem('QUEUE_KEY')) ?? [];
let readingArray = JSON.parse(localStorage.getItem('READING_KEY')) ?? [];
let finishedArray = JSON.parse(localStorage.getItem('FINISHED_KEY')) ?? [];


// - init
const api = new ApiService();
showBookshelf ('QUEUE_KEY', 'Хочу прочитати');

result.addEventListener('click', onItemClick);

bookshelves.forEach(el => {
    el.addEventListener('click', (e) => {
        el.querySelectorAll('button').forEach(el => el.classList.remove('current'));

        e.target.classList.add('current');

        let heading = e.target.textContent;

        switch (e.target.dataset.shelf) {
            case 'queue':
                showBookshelf ('QUEUE_KEY', heading);
                break;
            case 'reading':
                showBookshelf ('READING_KEY', heading);
                break;
            case 'finished':
                showBookshelf ('FINISHED_KEY', heading);
                break;
            case 'all-lib':
                AllBookshelves();
                break;
            default:
                break;
        }
    })
})

// - functions

function onItemClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('title') && !e.target.classList.contains('item-img')) return;

    api.sendRequest(`${api.baseUrl}/volumes/${e.target.closest('.item').dataset.id}`)
    .then((data) => {
        renderInfo(data);
    })
}

function renderInfo(data){
    // - render single modal
    document.querySelector('.single-modal').innerHTML = singleInfo(data, imageURL, queueArray, readingArray, finishedArray).temlate;

    // - get data for storage
    let bookInfo = singleInfo(data, imageURL).info;

    // - add-to-library-Btns subscription & add to storage
    const queueBtn = document.querySelector('[data-action="add-to-queue"]');
    const readingBtn = document.querySelector('[data-action="add-to-reading"]');
    const finishedBtn = document.querySelector('[data-action="add-to-finished"]');

    queueBtn.addEventListener('click', (e) => {
        addToStorage(bookInfo, 'QUEUE_KEY', queueArray);
        showBookshelf ('QUEUE_KEY', 'Хочу прочитати');
        document.querySelector('.single-modal').innerHTML = singleInfo(data, imageURL, queueArray, readingArray, finishedArray).temlate;
    })
    readingBtn.addEventListener('click', (e) => {
        addToStorage(bookInfo, 'READING_KEY', readingArray);
        showBookshelf ('READING_KEY', 'Читаю');
        document.querySelector('.single-modal').innerHTML = singleInfo(data, imageURL, queueArray, readingArray, finishedArray).temlate;
    })
    finishedBtn.addEventListener('click', (e) => {
        addToStorage(bookInfo, 'FINISHED_KEY', finishedArray);
        showBookshelf ('FINISHED_KEY', 'Прочитав');
        document.querySelector('.single-modal').innerHTML = singleInfo(data, imageURL, queueArray, readingArray, finishedArray).temlate;
    })
}

function addToStorage(info, key, arr) {
    const index = arr.findIndex((el) => el.id === info.id);
    arr.some(el => el.id === info.id) ? arr.splice(index, 1) : arr.push(info);
    localStorage.setItem(key, JSON.stringify(arr));

    return {info, arr};
}

function showBookshelf (key, shelfName) {
    const dataArr = JSON.parse(localStorage.getItem(key)) ?? [];
    result.innerHTML = myLibList(dataArr, shelfName, imageURL);

    // - deleteBtn subscribe
    document.querySelectorAll('[data-action="delete"]').forEach(el => {
        el.addEventListener('click', (e) => removeItem(e.target, key, dataArr, 'one'))
    });
}

function AllBookshelves () {
    const allStorage = new Map();
    allStorage.set ("QUEUE_KEY", JSON.parse(localStorage.getItem("QUEUE_KEY")) ?? [])
        .set ("READING_KEY", JSON.parse(localStorage.getItem("READING_KEY")) ?? [])
        .set ("FINISHED_KEY", JSON.parse(localStorage.getItem("FINISHED_KEY")) ?? []);

    result.innerHTML = AllLibList (allStorage, imageURL);

        // - deleteBtn subscribe
    document.querySelectorAll('[data-action="delete"]').forEach(el => {
        el.addEventListener('click', (e) => {
            const key = e.target.closest('.item').dataset.key;
            const arr = allStorage.get(key);
            removeItem(e.target, key, arr, 'all')
        })
    })
}

function removeItem(target, key, arr, flag) {
    // - find & remove item
    const itemId = target.closest('.item').dataset.id;
    const index = arr.findIndex(el => el.id === itemId);
    arr.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(arr));

    // - rerender result
    if (flag === 'one') showBookshelf (key, target.closest('.item').dataset.shelf);
    else if (flag === 'all') AllBookshelves ();
}
