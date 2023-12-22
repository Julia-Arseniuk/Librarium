export function singleInfo(data, imageURL, queueArray = [], readingArray = [], finishedArray = []) {
    let template = '';
    const {id, accessInfo, saleInfo, volumeInfo} = data;

    // - check storage
    const isInQueue = Boolean(queueArray.find(el => el.id === id));
    const isInReading = Boolean(readingArray.find(el => el.id === id));
    const isInFinished = Boolean(finishedArray.find(el => el.id === id));

    // - check data: general info
    const src = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : imageURL;
    let isbn = '';
    volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.forEach(el => {
        isbn += el.type + ': ' + el.identifier + '<br>';
    }) : 'немає ідентифікатору';
    const title = volumeInfo.title ?? 'немає заголовку';
    const auth = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'невідомий автор';
    const date = volumeInfo.publishedDate ? volumeInfo.publishedDate.substr(0, 4) : 'невідома дата';
    const category = volumeInfo.categories ? volumeInfo.categories.join(', ') : 'невідома категорія';
    const printType = volumeInfo.printType ==='BOOK' ? 'Книга' : 'Журнал';
    const descr = volumeInfo.description ? volumeInfo.description + '...' : 'немає опису';

    // - check data: for view/download
    let viewStatus = '';
    if (accessInfo.viewability === 'PARTIAL') viewStatus = 'Перегляд фрагменту';
    if (accessInfo.viewability === 'ALL_PAGES') viewStatus = 'Читати онлайн';

    let fileFormat = [];
    accessInfo.epub.isAvailable ? fileFormat.push(`epub`) : '';
    accessInfo.pdf.isAvailable ? fileFormat.push(`pdf`) : '';
    if (accessInfo.accessViewStatus === "NONE") fileFormat.push('недоступна для перегляду');


    let readLink = '';
    let readLinkHidden = '';
    accessInfo.accessViewStatus === "NONE" ? readLinkHidden = ' hidden' : readLink = accessInfo.webReaderLink;

    // - check data:for sale
    const isEBook = saleInfo.isEbook ? '<span class="material-symbols-outlined">book_2</span><p>Електронна книга</p>' : '<span class="material-symbols-outlined" style="color: lightgray">disabled_by_default</span><p style="color: lightgray">Електронна книга</p>';
    
    let price = '';
    switch (saleInfo.saleability) {
        case "FOR_SALE":
             price = '<b>Ціна:</b> ' + saleInfo.listPrice.amount + saleInfo.listPrice.currencyCode;
            break;
        case "NOT_FOR_SALE":
             price = 'Немає у продажу';
            break;
        case "FREE":
             price = 'Безкоштовно';
            break;
        default:
            break;
    }
    const hidden = saleInfo.saleability === "NOT_FOR_SALE" || saleInfo.saleability === "FREE" ? ' hidden' : '';
    const freeActive = saleInfo.saleability === "FREE" ? '' : ' hidden';
    const buyLink = saleInfo.buyLink ?? '';



    // template

    template = `<div class="modal-header">
    <h1 class="modal-title fs-5" id="AdvancedSearchModalLabel">${title}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
    <div class="single modal-body">
      <div class="container-fluid">
          <div class="row">
              <div class="col-sm-12 col-md-4 d-flex flex-column">
                  <div class="single-img">
                    <img src="${src}" alt="${title}" class="single-img"/>
                  </div>
                  <div class="ebook">${isEBook}</div>
                  <div class="buy">
                    <p class="mt-3">${price}</p>
                    <a href="${buyLink}" type="button" class="mt-3 mb-3 btn btn-primary buy-btn${hidden}" target="_blank">Придбати</a>
                    <a href="${accessInfo.pdf.downloadLink}" class="material-symbols-outlined${freeActive}">download</a>
                  </div>
              </div>
              <div class="single col-sm-12 col-md-8">
                <table>
                  <tr>
                      <td>Автор/-и:</td>
                      <td>${auth}</td>
                  </tr>
                  <tr>
                      <td>Видавництво:</td>
                      <td>${volumeInfo.publisher} | ${date}</td>
                  </tr>
                  <tr>
                      <td>ISBN:</td>
                      <td>${isbn}</td>
                  </tr>
                  <tr>
                      <td>Кількість сторінок:</td>
                      <td>${volumeInfo.pageCount}</td>
                  </tr>
                  <tr>
                      <td>Категорія:</td>
                      <td>${category}</td>
                  </tr>
                  <tr>
                      <td>Тип друку:</td>
                      <td>${printType}</td>
                  </tr>
                  <tr>
                      <td>Формат завантаження: </td>
                      <td>${fileFormat.join('<br>')}</td>
                  </tr>
                  <tr>
                      <td>Мова:</td>
                      <td>${volumeInfo.language}</td>
                  </tr>
                  <tr>
                      <td colspan="2"><strong>Опис: </strong>${descr}</td>
                  </tr>
              </table>
            </div>
          </div>
      </div>
    <div class="modal-footer">
    <div class="row">
        <div class="col-md-8 ms-auto">
            <div class="footer-buttons">
                <a href="${readLink}" type="button" class="btn btn-primary params ${readLinkHidden}" target="_blank">${viewStatus}</a>
                <div class="dropdown">
                <div>
                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${isInQueue || isInReading || isInFinished ? 'В бібліотеці' : 'Додати в бібліотеку'}
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item" type="button" data-action="add-to-queue"${isInReading || isInFinished ? ' disabled' : ''}>${isInQueue ? 'Видалити' : 'Хочу прочитати'}</button></li>
                        <li><button class="dropdown-item" type="button" data-action="add-to-reading"${isInQueue || isInFinished ? ' disabled' : ''}>${isInReading ? 'Видалити' : 'Читаю'}</button></li>
                        <li><button class="dropdown-item" type="button" data-action="add-to-finished"${isInQueue || isInReading ? ' disabled' : ''}>${isInFinished ? 'Видалити' : 'Прочитано'}</button></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </div>
  </div>`;

  return {temlate: template, info: {id: id, img: src, title: title, author: auth, date: date, description: descr}};
}


