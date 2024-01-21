




const signup = async (name,email,password,confirm_password,formData) =>{
    try{

        const res = await axios({
            method:'POST',
            url:'http://127.0.0.1:8000/api/v1/users/signup',
            data:{
                name:name,
                email:email,
                password:password,
                confirmPassword:confirm_password
            }
        })
        if(formData){
            const ress = await axios({
                method:'PATCH',
                url:`http://127.0.0.1:8000/api/v1/users/uploadImage`,
                data:formData,
                headers:{
                    authorization:`Bearer ${res.data.token}`
                } 
            })
        }
        document.cookie = `jwt= ${res.data.token}` 
        swal("Hello. Let's move forward!").then((val)=>{
            location.assign('/')
        })
    }catch(err){
        console.log(err)
    }
}










document.getElementById('signup').addEventListener('submit',(e)=>{
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirm_password = document.getElementById('confirm_password').value
    const image = document.getElementById('photo').files[0]

    if(image){
        const formData = new FormData();
        formData.append('photo', image);
        signup(name,email,password,confirm_password,formData)
    }else{
        signup(name,email,password,confirm_password)
    }

})





