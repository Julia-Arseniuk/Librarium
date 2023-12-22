export function myLibList (arr, shelfName, imageURL) {
    let template = `<div class="list-wrap">
                        <h2>${shelfName}</h2>`;

    if (arr.length > 0) {
        arr.forEach((el) => {
            let {id, img, title, author, date, description} = el;
    
            template += `<div class="item row" data-id="${id}" data-shelf="${shelfName}">
                <img src="${img}" alt="${title}" class="d-block item-img col-3" data-bs-toggle="modal" data-bs-target="#singleModal">
                                <div class="info col-9">
                                    <p class="title" data-bs-toggle="modal" data-bs-target="#singleModal">${title}</p>
                                    <p class="author">${author}</p>
                                    <p class="date">${date}</p>
                                    <p class="describe">${description.substr(0, 250)}</p>
                                    <span class="material-symbols-outlined delete-btn" data-action="delete">delete</span>
                                </div>
                            </div>`;
        });
    
    } else template += '<h5>Немає книжок</h5>'               
    
    template += `</div>`

    return template;
    
}