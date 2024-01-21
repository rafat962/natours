
const login = async (email,password)=>{
    try{
        const res = await axios({
            method:'POST',
            url:'http://127.0.0.1:8000/api/v1/users/login',
            data:{
                email:email,
                password:password
            }
        })
        document.cookie = `jwt= ${res.data.token}` 
        swal("Welcome back!", "You have successfully logged in. Let's move forward!").then((val)=>{
            location.assign('/')
        })
    }catch(err){
        console.log(err)
    }
}


// admin@natours.io



document.querySelector('.login').addEventListener('submit',(f)=>{
    f.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email,password)
})




