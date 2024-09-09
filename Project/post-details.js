//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)
const ol = document.getElementById('ol');
const wrapperDiv = document.getElementById('wrapper');
const localInfo = localStorage.getItem('userId');
const localPostId = localStorage.getItem('postId');
fetch(`https://jsonplaceholder.typicode.com/users/${localInfo}/posts`)
    .then(value => value.json())
    .then((postObject) => {
        for (const postElement of postObject) {
            if (postElement.id == localPostId) {
                for (const key in postElement) {
                    const li = document.createElement('li');
                    li.innerText = `${key}:${postElement[key]}`
                    ol.appendChild(li)
                }
            }
        }

    })

fetch(`https://jsonplaceholder.typicode.com/posts/${localPostId}/comments`)
    .then(value => value.json())
    .then((coments) => {
        for (const coment of coments) {
            const comentDiv = document.createElement('div');
            comentDiv.classList.add('comentDiv')
            for (const comentKey in coment) {
                const comentElementDiv = document.createElement('div');
                comentElementDiv.innerText = `${comentKey}:${coment[comentKey]}`
                comentDiv.appendChild(comentElementDiv)
            }
            wrapperDiv.appendChild(comentDiv)
        }

    })