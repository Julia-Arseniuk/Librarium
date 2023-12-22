export function drawingButtons (paginationWrap, startPage, endPage, currentPage, pagesLimit) {
    let template = '';
    let totalPages = currentPage;

    template = 
        `<button type="button" class="pagination-btn first btn btn-light     material-symbols-outlined" data-dir="first"${currentPage <= pagesLimit ? ' disabled' : ''}>keyboard_double_arrow_left</button>
        
        <button type="button" class="pagination-btn prev btn btn-light material-symbols-outlined" data-dir="prev"${currentPage == 1 ? ' disabled' : ''}>chevron_left</button>`

    for (let i = startPage; i <= endPage; i++)
    template += `
        <button type="button" class="pagination-btn page-btn btn btn-light${currentPage == i ? ' active' : ''}" data-page="${i}">${i}</button>`;

    template +=`
        <button type="button" class="pagination-btn next btn btn-light material-symbols-outlined" data-dir="next"${currentPage == totalPages ? ' disabled' : ''}>chevron_right</button>
    
        <button type="button" class="pagination-btn btn last btn-light material-symbols-outlined" data-dir="last"${currentPage > totalPages - pagesLimit ? ' disabled' : ''}>double_arrow</button>`;

    paginationWrap.innerHTML = template;
}
