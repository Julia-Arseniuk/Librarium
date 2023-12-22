/**
 * 
 * @param {Map<key, arr>} storage 
 * @param {string} imageURL 
 * @returns 
 */
export function AllLibList (storage, imageURL) {
    let template = '';

    storage.forEach((arr, key) => {
        let shelfName = '';

        if (key === "QUEUE_KEY") shelfName = 'Хочу прочитати';
        if (key === "READING_KEY") shelfName = 'Читаю';
        if (key === "FINISHED_KEY") shelfName = 'Прочитано';

        template += `<div class="list-wrap">
                        <h2>${shelfName}</h2>`;

        if (arr.length > 0) {
            arr.forEach((el) => {
                let {id, img, title, author, date, description} = el;

                template += `<div class="item row" data-id="${id}" data-shelf="${shelfName}" data-key="${key}">
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

        } else template += '<h5>Немає книжок</h5>'  ;             

        template += `</div><hr>`;
    })

    return template;
}