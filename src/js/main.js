import AOS from 'aos';
import ApiService from "./api";
import { responseList } from '../templates/response-list';
import { singleInfo } from "../templates/single";
import { drawingButtons } from '../templates/pagination';

import imageURL from '../img/no-image-found.png';

AOS.init({
    startEvent: 'scroll',
    duration: 700
});

// - Refs

const form = document.querySelectorAll('form');
const header = document.querySelector('header');
const paramsForm = document.querySelector('.params-form');
const searchByParams = document.querySelector('.params');
const result = document.querySelector('.result');
const pagination = document.querySelector('.pagination');
const paginationWrap = pagination.querySelector('.pagination-wrap');
const moreBtn = pagination.querySelector('.more-btn');

const pagesLimit = window.innerWidth >= 768 ? 10 : 5;
let start, end;

// - localStorage

let queueArray = JSON.parse(localStorage.getItem('QUEUE_KEY')) ?? [];
let readingArray = JSON.parse(localStorage.getItem('READING_KEY')) ?? [];
let finishedArray = JSON.parse(localStorage.getItem('FINISHED_KEY')) ?? [];

// - Init

const api = new ApiService();

form.forEach((el) => {
    if (!el.classList.contains('params-form')) {
        el.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('main-form')) {
                header.classList.remove('hidden');
                result.classList.remove('hidden');
                pagination.classList.remove('hidden');
            }    
        
            api.getOnQuickSearch(e.target.querySelector('.main-search').value)
            .then((result) => {
                renderItems(result)
                window.scrollTo(0, window.innerHeight);
            })
            .then (() => {
                if (moreBtn.hasAttribute('disabled')) {
                    moreBtn.removeAttribute('disabled')
                }
                drawingButtons(paginationWrap, api.currentPage, api.currentPage, api.currentPage, pagesLimit);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
            e.target.querySelector('.main-search').value = '';
        }); 
    }
}) 

// - Event subscriptions

searchByParams.addEventListener('click', onSearchByParamsClick);
result.addEventListener('click', onItemClick);

moreBtn.addEventListener('click', onMoreBtnClick)
paginationWrap.addEventListener('click', onPageBtnClick)

// - Functions

function onSearchByParamsClick () {
    api.getOnAdvancedSearch(paramsForm)
    .then((result) => {
        renderItems(result);
    })
    .then (() => {
        if (moreBtn.hasAttribute('disabled')) {
            moreBtn.removeAttribute('disabled')
        }
        drawingButtons(paginationWrap, api.currentPage, api.currentPage, api.currentPage, pagesLimit);
    })    
    .catch((err) => {
        console.log('Error: ', err.message);
        alert(err);
    });

}

function renderItems(data) {
    if (data.totalItems > 0) {
        result.innerHTML = responseList(data.items, imageURL);
    }
    else alert ('Не знайдено. Спробуйте інші параметри');
}

function onItemClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('title') && !e.target.classList.contains('item-img')) return;

    api.sendRequest(e.target.closest('.item').dataset.selfLink)
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

    queueArray = JSON.parse(localStorage.getItem('QUEUE_KEY')) ?? [];
    readingArray = JSON.parse(localStorage.getItem('READING_KEY')) ?? [];
    finishedArray = JSON.parse(localStorage.getItem('FINISHED_KEY')) ?? [];

    queueBtn.addEventListener('click', (e) => {
        addToStorage(bookInfo, 'QUEUE_KEY', queueArray);
        document.querySelector('.single-modal').innerHTML = singleInfo(data, imageURL, queueArray, readingArray, finishedArray).temlate;
    })
    readingBtn.addEventListener('click', (e) => {
        addToStorage(bookInfo, 'READING_KEY', readingArray);
        document.querySelector('.single-modal').innerHTML = singleInfo(data, imageURL, queueArray, readingArray, finishedArray).temlate;
    })
    finishedBtn.addEventListener('click', (e) => {
        addToStorage(bookInfo, 'FINISHED_KEY', finishedArray);
        document.querySelector('.single-modal').innerHTML = singleInfo(data, imageURL, queueArray, readingArray, finishedArray).temlate;
    })
}

function addToStorage(info, key, arr) {
    const index = arr.findIndex((el) => el.id === info.id)
    arr.some(el => el.id === info.id) ? arr.splice(index, 1) : arr.push(info);
    localStorage.setItem(key, JSON.stringify(arr));
}

function onMoreBtnClick(e) {
    api.currentPage = api.totalPages;

    api.getOnPaginationBtnClick(api.currentPage)
    .then((result) => {
        if (result.items){
            ++api.currentPage;
            ++api.totalPages;

            renderItems(result);
            window.scrollTo(0, window.innerHeight);

            if (api.currentPage <= pagesLimit){
                start = 1;
                end = api.currentPage;
            }
            else if (api.currentPage > pagesLimit) {
                start = api.currentPage - pagesLimit + 1;
                end = api.currentPage;
            }

            drawingButtons (paginationWrap, start, end, api.currentPage, pagesLimit);
        }
        else {
            alert('No more items');
            e.target.setAttribute('disabled', 'true');
        }
})
}

function onPageBtnClick(e) {
    switch (true) {
        case e.target.classList.contains('page-btn'):
            api.currentPage = Number(e.target.dataset.page);
            console.log('api.currentPage=', api.currentPage);
            break;

        case e.target.dataset.dir === 'prev':
            --api.currentPage;

            if (api.currentPage <= pagesLimit) {
                start = 1;
                end = Math.min(api.totalPages, pagesLimit);
            } else if (api.currentPage < start && api.currentPage - pagesLimit + 1 > 1 ) {
                start = api.currentPage - pagesLimit + 1;
                end = api.currentPage;
            }
            break;

        case e.target.dataset.dir === 'next':
            ++api.currentPage;

            if (api.currentPage <= pagesLimit) {
                start = 1;
                end = Math.min(api.totalPages, pagesLimit);
            } else if (api.currentPage > end && api.currentPage <= api.totalPages - pagesLimit) {
                start = api.currentPage;
                end = api.currentPage + pagesLimit - 1;
            } else if (api.currentPage >= api.totalPages - (pagesLimit - 1)) {
                start = api.totalPages - (pagesLimit - 1);
                end = api.totalPages;
            } 
            break;

        case e.target.dataset.dir === 'first':
            api.currentPage = 1;
            start = 1;
            end = pagesLimit;
            break;

        case e.target.dataset.dir === 'last':
            api.currentPage = api.totalPages;
            start = api.totalPages - (pagesLimit - 1);
            end = api.totalPages;
            break;

        default:
            break;
    }

    api.getOnPaginationBtnClick(api.currentPage - 1)
    .then((result) => {
            renderItems(result);
            drawingButtons (paginationWrap, start, end, api.currentPage, pagesLimit);
    });
}

