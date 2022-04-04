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
let leftHits;

async function fetchFiles(search, page) {
    try {
        const response = await axios.get(
            `https://pixabay.com/api/?key=${APIkey}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
        );
        return response.data;
    } catch (error) {
        console.log(error.message)
    }
};

const searchFiles = () => {
    fetchFiles(input.value, pageNumber)
        .then(photos => {
            if (pageNumber < 1) {
                gallery.innerHTML = '';
            } else if (pageNumber >= 1) {
                btnLoadMore.classList.remove('is-hidden');
                if (leftHits <= 0) {
                    btnLoadMore.classList.add('is-hidden');
                    Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
                }
            }
            viewFiles(photos);
            pageNumber += 1;
            leftHits = totalHits - pageNumber * 40;
        })
        .catch (error => {
            console.log(error);
    });
};

function viewFiles(photos) {
    totalHits = photos.totalHits;
    if (pageNumber <= 1) {
        leftHits = totalHits;
        if (totalHits <= 0) {
            Notiflix.Notify.success(`Found ${photos.totalHits} images`);
        }
    }
    photos.hits.forEach(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            gallery.innerHTML += `<div class="photo-card">
                <a class="photo-carf__item" href="${largeImageURL}">
                    <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="leazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b class="info-item__description">Likes
                        <span class="info-item__count">${likes}</span>
                        </b>
                    </p>
                    <p class="info-item">
                        <b class="info-item__descriptions">Views
                        <span class="info-item__count">${views}/span>
                        </b>
                    </p>
                    <p class="info-item">
                        <b class="info-item__description">Comments
                        <span class="info-item__count">${comments}</span>
                        </b>
                    </p>
                    <p class="info-item">
                        <b class="info-item__descriptions">Downloads
                        <span class="info-item__count">${downloads}/span>
                        </b>
                    </p>
                </div>
            </div>`;
        }
    )
}



const searchFirstFiles = event => {
    event.preventDefault();
    pageNumber = 1;
    gallery.innerHTML = '';
    searchFiles();
};

const searchMoreFiles = event => {
    event.preventDefault();
    searchFiles();
};

btnSearch.addEventListener('click', searchFirstFiles);
btnLoadMore.addEventListener('click', searchMoreFiles);