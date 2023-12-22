function t(t,e,a,s){Object.defineProperty(t,e,{get:a,set:s,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},i={},l=a.parcelRequireabfc;function r(t,e,a=[],s=[],i=[]){let{id:l,accessInfo:r,saleInfo:d,volumeInfo:n}=t,o=!!a.find(t=>t.id===l),c=!!s.find(t=>t.id===l),u=!!i.find(t=>t.id===l),g=n.imageLinks?n.imageLinks.thumbnail:e,h="";n.industryIdentifiers&&n.industryIdentifiers.forEach(t=>{h+=t.type+": "+t.identifier+"<br>"});let b=n.title??"немає заголовку",m=n.authors?n.authors.join(", "):"невідомий автор",p=n.publishedDate?n.publishedDate.substr(0,4):"невідома дата",f=n.categories?n.categories.join(", "):"невідома категорія",E="BOOK"===n.printType?"Книга":"Журнал",y=n.description?n.description+"...":"немає опису",v="";"PARTIAL"===r.viewability&&(v="Перегляд фрагменту"),"ALL_PAGES"===r.viewability&&(v="Читати онлайн");let $=[];r.epub.isAvailable&&$.push("epub"),r.pdf.isAvailable&&$.push("pdf"),"NONE"===r.accessViewStatus&&$.push("недоступна для перегляду");let S="",I="";"NONE"===r.accessViewStatus?I=" hidden":S=r.webReaderLink;let _=d.isEbook?'<span class="material-symbols-outlined">book_2</span><p>Електронна книга</p>':'<span class="material-symbols-outlined" style="color: lightgray">disabled_by_default</span><p style="color: lightgray">Електронна книга</p>',k="";switch(d.saleability){case"FOR_SALE":k="<b>Ціна:</b> "+d.listPrice.amount+d.listPrice.currencyCode;break;case"NOT_FOR_SALE":k="Немає у продажу";break;case"FREE":k="Безкоштовно"}let w="NOT_FOR_SALE"===d.saleability||"FREE"===d.saleability?" hidden":"",L="FREE"===d.saleability?"":" hidden",N=d.buyLink??"";return{temlate:`<div class="modal-header">
    <h1 class="modal-title fs-5" id="AdvancedSearchModalLabel">${b}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
    <div class="single modal-body">
      <div class="container-fluid">
          <div class="row">
              <div class="col-sm-12 col-md-4 d-flex flex-column">
                  <div class="single-img">
                    <img src="${g}" alt="${b}" class="single-img"/>
                  </div>
                  <div class="ebook">${_}</div>
                  <div class="buy">
                    <p class="mt-3">${k}</p>
                    <a href="${N}" type="button" class="mt-3 mb-3 btn btn-primary buy-btn${w}" target="_blank">Придбати</a>
                    <a href="${r.pdf.downloadLink}" class="material-symbols-outlined${L}">download</a>
                  </div>
              </div>
              <div class="single col-sm-12 col-md-8">
                <table>
                  <tr>
                      <td>Автор/-и:</td>
                      <td>${m}</td>
                  </tr>
                  <tr>
                      <td>Видавництво:</td>
                      <td>${n.publisher} | ${p}</td>
                  </tr>
                  <tr>
                      <td>ISBN:</td>
                      <td>${h}</td>
                  </tr>
                  <tr>
                      <td>Кількість сторінок:</td>
                      <td>${n.pageCount}</td>
                  </tr>
                  <tr>
                      <td>Категорія:</td>
                      <td>${f}</td>
                  </tr>
                  <tr>
                      <td>Тип друку:</td>
                      <td>${E}</td>
                  </tr>
                  <tr>
                      <td>Формат завантаження: </td>
                      <td>${$.join("<br>")}</td>
                  </tr>
                  <tr>
                      <td>Мова:</td>
                      <td>${n.language}</td>
                  </tr>
                  <tr>
                      <td colspan="2"><strong>Опис: </strong>${y}</td>
                  </tr>
              </table>
            </div>
          </div>
      </div>
    <div class="modal-footer">
    <div class="row">
        <div class="col-md-8 ms-auto">
            <div class="footer-buttons">
                <a href="${S}" type="button" class="btn btn-primary params ${I}" target="_blank">${v}</a>
                <div class="dropdown">
                <div>
                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${o||c||u?"В бібліотеці":"Додати в бібліотеку"}
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item" type="button" data-action="add-to-queue"${c||u?" disabled":""}>${o?"Видалити":"Хочу прочитати"}</button></li>
                        <li><button class="dropdown-item" type="button" data-action="add-to-reading"${o||u?" disabled":""}>${c?"Видалити":"Читаю"}</button></li>
                        <li><button class="dropdown-item" type="button" data-action="add-to-finished"${o||c?" disabled":""}>${u?"Видалити":"Прочитано"}</button></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </div>
  </div>`,info:{id:l,img:g,title:b,author:m,date:p,description:y}}}null==l&&((l=function(t){if(t in s)return s[t].exports;if(t in i){var e=i[t];delete i[t];var a={id:t,exports:{}};return s[t]=a,e.call(a.exports,a,a.exports),a.exports}var l=Error("Cannot find module '"+t+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(t,e){i[t]=e},a.parcelRequireabfc=l),l.register("27Lyk",function(e,a){t(e.exports,"register",()=>s,t=>s=t),t(e.exports,"resolve",()=>i,t=>i=t);var s,i,l={};s=function(t){for(var e=Object.keys(t),a=0;a<e.length;a++)l[e[a]]=t[e[a]]},i=function(t){var e=l[t];if(null==e)throw Error("Could not resolve bundle with id "+t);return e}}),l("27Lyk").register(JSON.parse('{"1hAzv":"my-library.67545f15.js","jaSBS":"no-image-found.9e3cfd72.png"}'));var d={};d=new URL(l("27Lyk").resolve("jaSBS"),import.meta.url).toString();const n=document.querySelector(".result-lib"),o=document.querySelectorAll(".bookshelves");let c=JSON.parse(localStorage.getItem("QUEUE_KEY"))??[],u=JSON.parse(localStorage.getItem("READING_KEY"))??[],g=JSON.parse(localStorage.getItem("FINISHED_KEY"))??[];const h=new class{constructor(){this.baseUrl="https://www.googleapis.com/books/v1",this.apiKey="AIzaSyDji-FbnVwseMFcebB3YE0rY7T-A9Q92GQ",this.searchValue="",this.queryString="",this.url="",this.startIndex=0,this.itemsPerPage=10,this.totalPages=1,this.currentPage=1}getOnQuickSearch(t){return this.startIndex=0,this.currentPage=1,this.totalPages=1,this.searchValue=t.replaceAll(" ","+"),this.url=`${this.baseUrl}/volumes?fields=totalItems,items&q=${this.searchValue}&startIndex=${this.startIndex}&maxResults=${this.itemsPerPage}&key=${this.apiKey}`,this.sendRequest(this.url)}getOnAdvancedSearch(t){return this.startIndex=0,this.currentPage=1,this.totalPages=1,this.url=`${this.baseUrl}/volumes?fields=totalItems,items&q=${this.searchValue}${this.getParams(t)}&startIndex=${this.startIndex}&key=${this.apiKey}`,this.sendRequest(this.url)}getParams(t){this.queryString="";let e=new FormData(t),a=Object.fromEntries(e),s=Object.keys(a);return s.forEach(t=>{if(""!==a[t]){let e=a[t].split(" ");"intitle"===t||"inauthor"===t||"inpublisher"===t||"subject"===t||"isbn"===t?1==e.length?this.queryString+=`+${t}:${a[t]}`:e.length>1&&e.forEach(e=>this.queryString+=`+${t}:${e}`):this.queryString+=`&${t}=${a[t]}`}}),""!==a.maxResults&&(this.itemsPerPage=Number(a.maxResults)),this.queryString}getOnPaginationBtnClick(t){let e=this.url.replace("startIndex=0","startIndex="+t*this.itemsPerPage);return this.sendRequest(e)}checkResponse(t){if(!t.error)return t;{let e=Error("Code: "+t.error.code+"\nError message: "+t.error.message);throw e}}sendRequest(t){return fetch(t).then(t=>t.json()).then(t=>this.checkResponse(t)).then(t=>t)}};function b(t,e,a){let s=a.findIndex(e=>e.id===t.id);return a.some(e=>e.id===t.id)?a.splice(s,1):a.push(t),localStorage.setItem(e,JSON.stringify(a)),{info:t,arr:a}}function m(t,e){let a;let s=JSON.parse(localStorage.getItem(t))??[];n.innerHTML=(a=`<div class="list-wrap">
                        <h2>${e}</h2>`,s.length>0?s.forEach(t=>{let{id:s,img:i,title:l,author:r,date:d,description:n}=t;a+=`<div class="item row" data-id="${s}" data-shelf="${e}">
                <img src="${i}" alt="${l}" class="d-block item-img col-3" data-bs-toggle="modal" data-bs-target="#singleModal">
                                <div class="info col-9">
                                    <p class="title" data-bs-toggle="modal" data-bs-target="#singleModal">${l}</p>
                                    <p class="author">${r}</p>
                                    <p class="date">${d}</p>
                                    <p class="describe">${n.substr(0,250)}</p>
                                    <span class="material-symbols-outlined delete-btn" data-action="delete">delete</span>
                                </div>
                            </div>`}):a+="<h5>Немає книжок</h5>",a+="</div>"),document.querySelectorAll('[data-action="delete"]').forEach(e=>{e.addEventListener("click",e=>f(e.target,t,s,"one"))})}function p(){let t;let e=new Map;e.set("QUEUE_KEY",JSON.parse(localStorage.getItem("QUEUE_KEY"))??[]).set("READING_KEY",JSON.parse(localStorage.getItem("READING_KEY"))??[]).set("FINISHED_KEY",JSON.parse(localStorage.getItem("FINISHED_KEY"))??[]),n.innerHTML=(t="",e.forEach((e,a)=>{let s="";"QUEUE_KEY"===a&&(s="Хочу прочитати"),"READING_KEY"===a&&(s="Читаю"),"FINISHED_KEY"===a&&(s="Прочитано"),t+=`<div class="list-wrap">
                        <h2>${s}</h2>`,e.length>0?e.forEach(e=>{let{id:i,img:l,title:r,author:d,date:n,description:o}=e;t+=`<div class="item row" data-id="${i}" data-shelf="${s}" data-key="${a}">
                    <img src="${l}" alt="${r}" class="d-block item-img col-3" data-bs-toggle="modal" data-bs-target="#singleModal">
                                    <div class="info col-9">
                                        <p class="title" data-bs-toggle="modal" data-bs-target="#singleModal">${r}</p>
                                        <p class="author">${d}</p>
                                        <p class="date">${n}</p>
                                        <p class="describe">${o.substr(0,250)}</p>
                                        <span class="material-symbols-outlined delete-btn" data-action="delete">delete</span>
                                    </div>
                                </div>`}):t+="<h5>Немає книжок</h5>",t+="</div><hr>"}),t),document.querySelectorAll('[data-action="delete"]').forEach(t=>{t.addEventListener("click",t=>{let a=t.target.closest(".item").dataset.key,s=e.get(a);f(t.target,a,s,"all")})})}function f(t,e,a,s){let i=t.closest(".item").dataset.id,l=a.findIndex(t=>t.id===i);a.splice(l,1),localStorage.setItem(e,JSON.stringify(a)),"one"===s?m(e,t.closest(".item").dataset.shelf):"all"===s&&p()}m("QUEUE_KEY","Хочу прочитати"),n.addEventListener("click",function(t){t.preventDefault(),(t.target.classList.contains("title")||t.target.classList.contains("item-img"))&&h.sendRequest(`${h.baseUrl}/volumes/${t.target.closest(".item").dataset.id}`).then(t=>{(function(t){document.querySelector(".single-modal").innerHTML=r(t,e(d),c,u,g).temlate;let a=r(t,e(d)).info,s=document.querySelector('[data-action="add-to-queue"]'),i=document.querySelector('[data-action="add-to-reading"]'),l=document.querySelector('[data-action="add-to-finished"]');s.addEventListener("click",s=>{b(a,"QUEUE_KEY",c),m("QUEUE_KEY","Хочу прочитати"),document.querySelector(".single-modal").innerHTML=r(t,e(d),c,u,g).temlate}),i.addEventListener("click",s=>{b(a,"READING_KEY",u),m("READING_KEY","Читаю"),document.querySelector(".single-modal").innerHTML=r(t,e(d),c,u,g).temlate}),l.addEventListener("click",s=>{b(a,"FINISHED_KEY",g),m("FINISHED_KEY","Прочитав"),document.querySelector(".single-modal").innerHTML=r(t,e(d),c,u,g).temlate})})(t)})}),o.forEach(t=>{t.addEventListener("click",e=>{t.querySelectorAll("button").forEach(t=>t.classList.remove("current")),e.target.classList.add("current");let a=e.target.textContent;switch(e.target.dataset.shelf){case"queue":m("QUEUE_KEY",a);break;case"reading":m("READING_KEY",a);break;case"finished":m("FINISHED_KEY",a);break;case"all-lib":p()}})});
//# sourceMappingURL=my-library.67545f15.js.map
