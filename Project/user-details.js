// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
const localInfo = localStorage.getItem('userId')
const wrapperDiv = document.getElementById('wrapper');
fetch('https://jsonplaceholder.typicode.com/users')
    .then(value => value.json())
    .then((usersObject) => {
        for (const user of usersObject) {
            if (user.id == localInfo) {
                for (const userKey in user) {
                    if (typeof user[userKey] === 'object') {
                        const object = user[userKey];
                        const objectDiv = document.createElement('div');
                        const divTitle = document.createElement('div');
                        divTitle.innerText = `${userKey}:`
                        objectDiv.appendChild(divTitle)
                        for (const objectKey in object) {
                            if (typeof object[objectKey] === 'object') {
                                const objectInObject = object[objectKey];
                                const boxDiv = document.createElement('div');
                                boxDiv.innerText = `${objectKey}:`
                                for (const key in objectInObject) {
                                    const divInObject = document.createElement('div');
                                    divInObject.innerText = `${key}:${objectInObject[key]}`
                                    boxDiv.appendChild(divInObject)
                                    objectDiv.appendChild(boxDiv)
                                }
                            } else {
                                const objectKeyDiv = document.createElement('div');
                                objectKeyDiv.innerText = `${objectKey}:${object[objectKey]}`
                                objectDiv.appendChild(objectKeyDiv)

                            }
                        }
                        wrapperDiv.appendChild(objectDiv)
                    } else {
                        const keyDiv = document.createElement('div');
                        keyDiv.innerText = `${userKey}:${user[userKey]}`
                        wrapperDiv.appendChild(keyDiv)
                    }

                }
            }
        }
    })
fetch(`https://jsonplaceholder.typicode.com/users/${localInfo}/posts`)
    .then(value => value.json())
    .then((postObject) => {
        const posts = document.getElementById('posts');
        posts.style.display = 'none'
        for (const postObjectElement of postObject) {
            const postDiv = document.createElement('div');
            postDiv.innerText = `title :${postObjectElement.title}`
            postDiv.classList.add('postDiv')
            const postButton = document.createElement("button");
            postButton.innerText = 'post-details';
            postDiv.appendChild(postButton)
            posts.appendChild(postDiv)
            postButton.onclick = function () {
                window.location = 'post-details.html'
                localStorage.setItem('postId',postObjectElement.id)
            }
        }
        document.getElementById('button').onclick = function () {
            posts.style.display = posts.style.display === 'none' ? 'grid' : 'none';
        }

    })
