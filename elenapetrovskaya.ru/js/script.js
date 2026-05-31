const reviews = document.querySelectorAll('.review');
var review_index = 0;
var review_index_last = 0;
const sign_up = document.getElementById('sign-up');
const dialog_sign_up_close = document.getElementById('dialog-sign-up-close');
const burger = document.getElementById('burger');
const burger_menu = document.getElementById('burger-menu');
const about = document.getElementById('about');

const services_and_prices_reviews = document.getElementById('services-and-prices-reviews');
const reviews_gui_left = document.getElementById('reviews-gui-left');
const reviews_gui_right = document.getElementById('reviews-gui-right');
const review_animation = document.getElementById('review-animation');
window.addEventListener('DOMContentLoaded', () => {
    choose_review(review_index);
    const main = document.getElementById('main'); 
    if (main) {
        setTimeout(() => {
            main.classList.add('active');
        }, 20);
    }

});
reviews_gui_left.addEventListener('click', (e) => {
    if (review_index>0){
        review_index-=1;
    }else{
        review_index=reviews.length-1;
    }  
    choose_review(review_index);
});
reviews_gui_right.addEventListener('click', (e) => {
    if (review_index<reviews.length-1){
        review_index+=1;
    }else{
        review_index=0;
    }
    choose_review(review_index);
});
sign_up.addEventListener('click', (e) => {
    window.dialog_sign_up.showModal();
});
burger.addEventListener('click', () => {
    burger_menu.classList.toggle('open');
    burger.textContent = (burger.textContent === '☰') ? '✕' : '☰';
});
dialog_sign_up_close.addEventListener('click', () => {
    window.dialog_sign_up.close();
});
function choose_review(review_index){
    console.log(review_index);
    
    setTimeout(() => {
        reviews.forEach((review, index) => {
            if (index == review_index) {
                review.classList.remove("hidden");
            } else {
                review.classList.add("hidden");
            }
        });
        
        services_and_prices_reviews.style.height = '0px';
        const newHeight = services_and_prices_reviews.scrollHeight;
        services_and_prices_reviews.style.height = newHeight + 'px';
        review_animation.classList.remove("fade-out");
        review_animation.classList.add("fade-on");
        setTimeout(() => {
            services_and_prices_reviews.style.height = 'auto';
        }, 410);
    }, 500);
}