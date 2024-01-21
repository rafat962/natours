





var ul = document.querySelector('#navv')


ul.addEventListener('click',(e)=>{
    var targetli = e.target.closest('li')
    ul.querySelectorAll('li').forEach((a)=>{
        a.classList.remove('side-nav--active')
    })

    targetli.classList.add('side-nav--active')

}) 

