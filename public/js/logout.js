


const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

document.getElementById('logout').addEventListener('click',(el)=>{
    deleteCookie('jwt');
    swal("See you soon!", "You've been successfully logged out. Feel free to come back anytime!").then((val)=>{
        location.assign('/')
    })
})
