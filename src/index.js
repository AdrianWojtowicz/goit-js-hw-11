import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';

const btnSearch = document.querySelector('.search-btn');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');
const APIkey = '26492678-421fe4043219fdab389abba4d';

let pageNumber = 1;
let totalHits = 0;
let leftHits

async function fetchFiles(search, page) {
    try {
        const response = await axios.get(
            `https://pixabay.com/api/?key=${APIkey}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
        );
        return response.data;
    } catch (error) {
        console.log(error.message)
    }
}



btnSearch.addEventListener('click');
btnLoadMore.addEventListener('click');