// 获取元素
const ipt = document.querySelector('#title')
const ol = document.querySelector('#todolist')
const ul = document.querySelector('#donelist')
const todocount = document.querySelector('#todocount')
const donecount = document.querySelector('#donecount')


const data = localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : []

// 渲染函数
function load() {
  // ol的数据
  const olRes = data.map(function (t, i) {
    if (!t.done) {
      return `
        <li>
          <input type='checkbox'>
          <p id=${i}>${t.title}</p>
          <a href='javascript:;' id=${i}></a>
        </li>
      `
    }
  })
  // 保证新增数据在最前边
  olRes.reverse()
  // ul数据
  const ulRes = data.map(function (t, i) {
    if (t.done) {
      return `
        <li>
          <input type='checkbox' checked='checked' id=${i}>
          <p id=${i}>${t.title}</p>
          <a href='javascript:;' id=${i}></a>
        </li>
      `
    }
  })
  ulRes.reverse()
  // 给对应标签添加内容
  ol.innerHTML = olRes.join('')
  ul.innerHTML = ulRes.join('')
  // 处理事件个数
  todocount.innerHTML = ol.children.length
  donecount.innerHTML = ul.children.length
}
load()
// 输入框添加事件，添加内容
ipt.addEventListener('keyup', function (e) {
  if (e.key === 'Enter' && this.value.trim()) {
    // 添加一个对象
    data.push({ title: this.value, done: false })
    // 保存至本地存储
    localStorage.setItem('todolist', JSON.stringify(data))
    // 重新加载页面
    load()
    // 清空文本框
    this.value = ''
  }
})
// 处理函数，可分开
function change(e) {
  if (e.target.tagName === 'INPUT') {
    // 将data中的done值改变
    data[e.target.id].done = e.target.checked
    // 保存数据
    localStorage.setItem('todolist', JSON.stringify(data))
    load()
  }
  if (e.target.tagName === 'A') {
    // 删除点击项
    data.splice(e.target.id, 1)
    localStorage.setItem('todolist', JSON.stringify(data))
    load()
  }
}

ol.addEventListener('click', function (e) {
  change(e)
})
ul.addEventListener('click', function (e) {
  change(e)
})