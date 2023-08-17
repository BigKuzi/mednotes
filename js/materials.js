// Sort

const filterBox = document.querySelectorAll('.card');
    subjectsItems = document.querySelectorAll('.course')

document.querySelector('.subjects-nav').addEventListener('click', event => {
    if (event.target.tagName !== 'LI') return false;

    let filterClass = event.target.dataset['f'];

    const targetSubject = event.target

    subjectsItems.forEach(subjectItem => subjectItem.classList.remove('subjects-active'))
    targetSubject.classList.add('subjects-active')
    
    filterBox.forEach (elem => {
        elem.classList.remove('hide');
        if (!elem.classList.contains(filterClass)&& filterClass!== 'all') {
            elem.classList.add('hide');
        }
    });
    

});

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