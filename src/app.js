import './js/jquery.fancybox.min.js';
import './js/main.js';
import './scss/base.css'


function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

// import './js/registration.js';