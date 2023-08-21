// Sort

const courseActive = document.querySelectorAll('.course')

    function filter () {
        courseActive.addEventListener('click', event => {
            const targetId = event.target.dataset.filter
            const target = event.target

            courseActive.forEach(listItem => listItem.classList.remove('course-active'))
            target.classList.add('course-active')
        })
    }

function app() {
    const course = document.querySelectorAll('.course')
    const cards = document.querySelectorAll('.card')

    function filter (category, items) {
        items.forEach((item) => {
            const isItemFiltered = !item.classList.contains(category)
            const isShowAll = category.toLowerCase() === 'all'
            if (isItemFiltered && !isShowAll) {
                item.classList.add('anime')
            } else {
                item.classList.remove('hide')
                item.classList.remove('anime')
            }
        })
    }


    course.forEach((course) => {
        course.addEventListener('click', event => {
            const targetId = event.target.dataset.filter
            const target = event.target

            courseActive.forEach(listItem => listItem.classList.remove('course-active'))
            target.classList.add('course-active')

            const currentCategory = course.dataset.filter
            filter(currentCategory, cards)
            
        })
    })

    cards.forEach((card) => {
        card.ontransitionend = function () {
            if (card.classList.contains('anime')) {
                card.classList.add('hide')
            }
        }
    })
}

app()

// Tabs

const tabHeaders = document.querySelectorAll('[data-tab]');
const contentBoxes = document.querySelectorAll('[data-tab-content]');

tabHeaders.forEach(function (item) {
    item.addEventListener('click', function () {

        // 1. Скрыть все content box
        contentBoxes.forEach(function (item) {
            item.classList.add('hidden');
        });

        // 2. Выбрать нужный content box и показать его
        const contentBox = document.querySelector('#' + this.dataset.tab);
        contentBox.classList.remove('hidden');

    })
});