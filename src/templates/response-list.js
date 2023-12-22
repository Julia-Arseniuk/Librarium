export function responseList (arr, imageURL) {
    let template = '<div class="row row-cols-1 row-cols-md-2 gap-3">';

    arr.forEach(el => {
        let {id, selfLink, volumeInfo} = el;

        const src = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : imageURL;
        const title = volumeInfo.title ?? 'no title';
        const auth = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'unknown authors';
        const date = volumeInfo.publishedDate ? volumeInfo.publishedDate.substr(0, 4) : 'unknown date';
        const descr = volumeInfo.description ? volumeInfo.description.substr(0, 120) + '...' : 'no dscription';

        template += `<div class="item col row" data-id="${id}" data-self-link="${selfLink}" data-isbn="${isbn}">
            <img src="${src}" alt="${title}" class="d-block item-img col-3"  data-bs-toggle="modal" data-bs-target="#singleModal">
                            <div class="info col-9">
                                <p class="title" data-bs-toggle="modal" data-bs-target="#singleModal">${title}</p>
                                <p class="author">${auth}</p>
                                <p class="date">${date}</p>
                                <p class="describe">${descr}</p>
                            </div>
                        </div>`;
    });
    
    template += '</div>'

    return template;
    
}