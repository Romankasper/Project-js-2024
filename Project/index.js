// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
const wrapperDiv = document.getElementById('wrapper');
fetch('https://jsonplaceholder.typicode.com/users')
    .then(value => value.json())
    .then((usersObject) => {
        console.log(usersObject);
        for (const user of usersObject) {
            const userDiv = document.createElement('div');
            userDiv.classList.add('width50')
            const userId = document.createElement('h3');
            userId.innerText = `id:${user.id}`
            const userName = document.createElement('p');
            userName.innerText =`name:${user.name}`
            const buttonDetails = document.createElement('button');
            buttonDetails.classList.add('buttonDetails')
            buttonDetails.innerText= 'details'
            userDiv.append(userId, userName ,buttonDetails);
            buttonDetails.onclick =function () {
                window.location ='user-details.html'
                localStorage.setItem('userId',user.id)
            }
            wrapperDiv.appendChild(userDiv)
        }
    })