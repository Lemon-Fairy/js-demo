const todolist = document.querySelector('.demo-box')
const donelist = document.querySelector('#donelist')
// 1. 获取本地存储是否有数据
const date = localStorage.getItem('todolist')
const arr = date ? JSON.parse(date) : []
// console.log(arr);


// 2. 渲染函数
function render() {
    // 2.1 遍历arr map() 方法  
    const liArr = arr.map(function (item, i) {
        // 当每个对象的done的checked为false ，就渲染到 正在进行中
        if (!item.done) {
            return `
            <li data-num="${i}"><input type="checkbox"><p>${item.title}</p><a href='javascript:;' data-id="${i}"></a></li>
            `
        }

    })

    // 2.1 遍历arr map() 方法
    const liArr1 = arr.map(function (item, i) {
        // 当每个对象的done的checked为true(选中时) ，就渲染到 已经完成
        if (item.done) {
            return `
            <li data-num="${i}"><input type="checkbox" checked><p>${item.title}</p><a href='javascript:;' data-id="${i}"></a></li>
            `
        }
    })
    // 翻转数组，让每次输入的内容都是第一个
    liArr.reverse()
    liArr1.reverse()

    donelist.innerHTML = liArr1.join('')

    todolist.innerHTML = liArr.join('')

    // 正在进行中的数量    input的长度 就等于 右边数字
    const count = document.querySelector('#todocount')
    const num = todolist.querySelectorAll('input')
    count.innerHTML = `正在进行中:${num.length}`

    // 已完成的数量  
    const donecount = document.querySelector('#donecount')
    const num2 = donelist.querySelectorAll('input')
    donecount.innerHTML = `已完成:${num2.length}`

}
render()


// 3. 添加功能
const title = document.querySelector('#title')
// const ipt = document.querySelector('.demo-box input')
title.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' && title.value.trim()) {
        // console.log(title.value);
        // 3.1 创建空对象
        const obj = {}
        obj.done = false
        obj.title = title.value
        // 3.2 把obj push 给 arr
        title.value = ''
        arr.push(obj)
        // 3.3 写入本地存储
        localStorage.setItem('todolist', JSON.stringify(arr))
        render()
    }
})


// 4. 删除模块
todolist.addEventListener('click', function (e) {
    remove(e)
})

// 5. 正在进行勾选 到 已经完成

todolist.addEventListener('change', function (e) {
    toggle(e)
})

// 6. 已经完成删除模块
donelist.addEventListener('click', function (e) {
    remove(e)
})

// 7. 已经完成 到 勾选 切换
donelist.addEventListener('change', function (e) {
    toggle(e)
})


// 删除模块函数做调用
function remove(e) {
    if (e.target.tagName === 'A') {
        arr.splice(e.target.dataset.id, 1)
        localStorage.setItem('todolist', JSON.stringify(arr))
        render()
    }
}

// 切换模块函数做调用
function toggle(e) {
    if (e.target.tagName === 'INPUT') {
        // console.log(e.target.checked);
        // 5.1 点击checked 动态是true false
        let n = e.target.parentNode.dataset.num // 得到点击对象(input) 的父级(li)的自定属性值
        arr[n].done = e.target.checked // 把点击input的checked 状态给 数组对象的done(checked) 可以实现动态效果
        // console.log(n);
        // console.log(arr[n].done);
        // 5.2 写入本地存储
        localStorage.setItem('todolist', JSON.stringify(arr))
        render()
    }
}
