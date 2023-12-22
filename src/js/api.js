export default class ApiService {
    constructor () {
        this.baseUrl = 'https://www.googleapis.com/books/v1';
        this.apiKey = 'AIzaSyDji-FbnVwseMFcebB3YE0rY7T-A9Q92GQ';
        this.searchValue = '';
        this.queryString = '';
        this.url = '';
        this.startIndex = 0;
        this.itemsPerPage = 10;
        this.totalPages = 1;
        this.currentPage = 1;
    }

    getOnQuickSearch(keyWords){
        this.startIndex = 0;
        this.currentPage = 1;
        this.totalPages = 1;
        this.searchValue = keyWords.replaceAll(' ', '+');
        this.url = `${this.baseUrl}/volumes?fields=totalItems,items&q=${this.searchValue}&startIndex=${this.startIndex}&maxResults=${this.itemsPerPage}&key=${this.apiKey}`;
        return this.sendRequest(this.url);
    }

    getOnAdvancedSearch(paramsForm){
        this.startIndex = 0;
        this.currentPage = 1;
        this.totalPages = 1;
        this.url = `${this.baseUrl}/volumes?fields=totalItems,items&q=${this.searchValue}${this.getParams(paramsForm)}&startIndex=${this.startIndex}&key=${this.apiKey}`;
        
        return this.sendRequest(this.url);
    }

    getParams(paramsForm){
        this.queryString = '';
        const paramsData = new FormData(paramsForm);
        const paramsDataObj = Object.fromEntries(paramsData);
        const paramsDataArr = Object.keys(paramsDataObj);
        paramsDataArr.forEach(key => {
            if (paramsDataObj[key] !== '') {
                let value = paramsDataObj[key].split(' ');
                if (key === 'intitle' || key === 'inauthor' || key === 'inpublisher' || key === 'subject' || key === 'isbn') {
                    if (value.length == 1) {
                        this.queryString += `+${key}:${paramsDataObj[key]}`;
                    } else if (value.length > 1) {
                        value.forEach(el => this.queryString += `+${key}:${el}`)
                    }}
                else {
                    this.queryString += `&${key}=${paramsDataObj[key]}`
                }
            }
        })
        if (paramsDataObj.maxResults !== '') this.itemsPerPage = Number(paramsDataObj.maxResults);
        
        return this.queryString;
}

getOnPaginationBtnClick(index){
    let url = this.url.replace("startIndex=0", "startIndex=" + index * this.itemsPerPage);
    // console.log('url: ', url);
    return this.sendRequest(url);
}
  
    checkResponse(response) {
        if (!response.error) {
            return response;
        }
        else {
            const err = new Error ('Code: ' + response.error.code +  '\nError message: ' + response.error.message);
            throw err;
    }}
    
    sendRequest(url){
        return fetch(url)
        .then((response) => response.json())
        .then((responseObj) => this.checkResponse(responseObj))
        .then((data) => data);
    }
}

