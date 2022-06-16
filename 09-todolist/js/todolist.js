const data = localStorage.getItem('todolist')
const arr = data ? JSON.parse(data) : []

const ol = document.querySelector('#todolist')
const ul = document.querySelector('#donelist')
const todocount = document.querySelector('#todocount')
const donecount = document.querySelector('#donecount')

const ipt = document.querySelector('#title')

// olLoad()
function load() {
    // ol
    const olRes = arr.map((t, i) => {
        if (!t.done) {
            return `
            <li>
                <input type='checkbox'>
                <p>${t.title}</p>
                <a href='javascript:;' id=${i}></a>
            </li>
            `
        }
    })
    olRes.reverse()
    // ul
    const ulRes = arr.map((t, i) => {
        if (t.done) {
            return `
            <li>
                <input type='checkbox' checked='checked' >
                <p>${t.title}</p>
                <a href='javascript:;' id=${i}></a>
            </li>
            `
        }
    })
    ulRes.reverse()

    ol.innerHTML = olRes.join('')
    ul.innerHTML = ulRes.join('')

    todocount.innerHTML = ol.children.length
    donecount.innerHTML = ul.children.length
}
load()


ipt.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && this.value.trim()) {
        arr.push({ title: this.value, done: false })
        localStorage.setItem('todolist', JSON.stringify(arr))

        load()
        this.value = ''
    }
})

function remove(e) {
    if (e.target.tagName === 'A') {
        arr.splice(e.target.id, 1)
        localStorage.setItem('todolist', JSON.stringify(arr))
        load()
    }
}
function toggle(e) {
    if (e.target.tagName === 'INPUT') {
        let n = e.target.nextElementSibling.nextElementSibling.id
        console.log(n);
        arr[n].done = e.target.checked
        localStorage.setItem('todolist', JSON.stringify(arr))
        load()
    }
}
ol.addEventListener('click', function (e) {
    remove(e)
})
ol.addEventListener('change', function (e) {
    toggle(e)
})
ul.addEventListener('click', function (e) {
    remove(e)
})
ul.addEventListener('change', function (e) {
    toggle(e)
})