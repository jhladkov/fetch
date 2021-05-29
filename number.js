// const fizzbuzz = (arrNumbers) => {
//     arrNumbers.forEach(item => {
//         if (item % 3 === 0 && item % 5 === 0) {
//             console.log('fizzbuzz')
//         }else if ( item % 5 === 0 ) {
//             console.log('buzz');
//         }else if (item % 3 === 0) {
//             console.log('fizz')
//         }
//         else console.log(item)
//     })
// }
// fizzbuzz([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

// const anagram = (str1, str2) => {
//     let check = 0;
//     str2.split('').forEach(item2 => {
//         str1.split('').forEach((item, i) => {
//             if (str1[i].toUpperCase().includes(item2.toUpperCase())) ++check;
//         })
//     })
//     if (str1.length === check) return true
//     return false
// }
// console.log(anagram('abcg', 'cgba'))

// const findVowels = str => {
//     const arrVowels = ['a', 'i', 'o', 'u', 'e'];
//     const numberVowelsInStr = [];
//     arrVowels.forEach(item => {
//         if (str.toLowerCase().split('').includes(item)) {
//             numberVowelsInStr.push(item);
//         }
//     })
//     return numberVowelsInStr.length;
// }
// console.log(findVowels('James'))

// const fibonacci = (n) => {
//     return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2)
// }
// console.log(fibonacci(7))

// const fun = (arr) => {
//    return  arr.filter(item => item < 4)
// }
// console.log(fun([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

const form = document.querySelector('.form');
const inputMassage = document.querySelector('.form-input-message')
const inputName = document.querySelector('.form-input-name')
const button = document.querySelector('.button-input')
const listQuestions = document.querySelector('.list-question')
const link = 'https://test1-61dac-default-rtdb.firebaseio.com/questions.json'

const serverRequest = (link) => {
    return fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            massage: inputMassage.value,
            name: inputName.value
        })
    })
}
const serverResponse = (link) => {
    fetch(link)
        .then(res => res.json())
        .then(data => {
            if (data) {
                listQuestions.innerHTML = '' // иначе вопросы будут дублироваться
                for (let valueData of Object.values(data)) {
                    listQuestions.innerHTML += `
                <li class="user">${valueData.name}</li>
                <li class="item">${valueData.massage}</li>
                <hr>
`
                }
            } else listQuestions.innerHTML = `<p>Вопросов пока нет</p>`
        })
}
window.onload = () => {
    serverResponse(link);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if ( inputMassage.value === '') alert('Вы не ввели сообщение')
    else if ( inputName.value === '') alert('Вы не ввели имя')
    else {
        button.disabled = true;
        serverRequest(link)
            .then(() => {
                inputMassage.value = '';
                inputName.value = ''
                button.disabled = false;
            })
            .then(() => serverResponse(link))
    }
})