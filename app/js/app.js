// Меню-бургер
menu.onclick = () => {
    let nav = document.getElementById('myTopnav');
    if (nav.className == 'nav') {
        nav.className += ' responsive'
    } else {
        nav.className = 'nav'
    }
}

// Видео
let modal = document.getElementById('mymodal');
let open  = document.getElementById('btn-open-window');
let close = document.getElementsByClassName('close-modal')[0];

open.onclick = () => modal.style.display = 'block';

close.onclick = () => modal.style.display = 'none';

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

// Отзывы
var semf = document.getElementById('semf');
semf.addEventListener('click', function() {
    swal({
        title: 'Semf Ucuk',
		text: 'comment 1\n comment 2\n comment 3\n',
    })
});
var dik = document.getElementById('dik');
dik.addEventListener('click', function() {
    swal({
        title: 'Dik Adalin',
		text: 'comment 1\n comment 2\n comment 3\n',
    })
});
var jeng = document.getElementById('jeng');
jeng.addEventListener('click', function() {
    swal({
        title: 'Jeng Kol',
		text: 'comment 1\n comment 2\n comment 3\n',
    })
});
var pet = document.getElementById('pet');
pet.addEventListener('click', function() {
    swal({
        title: 'Pet Romak',
		text: 'comment 1\n comment 2\n comment 3\n',
    })
});

