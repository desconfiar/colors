const columns = document.querySelectorAll('.col')
const locks = document.querySelectorAll('.lock')

const select = document.querySelector('.select')
const menu = document.querySelector('.menu')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.modal-overlay')

// Variables

const opened = 'fa-lock-open'

const colors = []
const saved = JSON.parse(localStorage.getItem('saved')) || []

let isHex = localStorage.getItem('isHex') === 'true' || false

// Functions

const toHex = color => {
    return `#${color.map(item => item.toString(16)).join('')}`.toUpperCase()
}

const toRGB = color => `rgb(${color.join(', ')})`

const determine = color => {
    const [r, g, b] = color

    return (r + g + b) / 3 > 127 ? 'black' : 'white'
}

const get = () => Math.floor(Math.random() * 256)

const generate = () => [get(), get(), get()]

const set = () => {
    columns.forEach((col, index) => {
        col.children[0].textContent = isHex
            ? toHex(colors[index])
            : toRGB(colors[index])
    })
}

const save = (index, isLocked) => {
    saved[index] = isLocked ? colors[index] : null

    localStorage.setItem('saved', JSON.stringify(saved))
}

// Initial

columns.forEach((col, index) => {
    const color = generate()

    if (saved[index]) {
        colors[index] = saved[index]
    } else {
        colors.push(color)
    }

    col.children[0].textContent = isHex
        ? toHex(colors[index])
        : toRGB(colors[index])

    locks[index].children[0].style.color = determine(colors[index])

    col.style.color = determine(colors[index])
    col.style.backgroundColor = toRGB(colors[index])
})

locks.forEach((lock, index) => {
    if (saved[index]) {
        lock.children[0].classList.remove(opened)
    }

    lock.addEventListener('click', () => {
        lock.children[0].classList.toggle(opened)

        save(index, !lock.children[0].classList.contains(opened))

        console.log(localStorage.getItem('saved'))
    })
})

select.addEventListener('change', e => {
    isHex = e.target.value === 'hex'

    localStorage.setItem('isHex', isHex)

    set()
})

menu.addEventListener('click', () => {
    modal.classList.toggle('hidden')
})

overlay.addEventListener('click', e => {
    if (e.target === overlay) {
        modal.classList.toggle('hidden')
    }
})
