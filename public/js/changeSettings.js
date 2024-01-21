
//----------------- change email-Name -----------------
const changedata = async (name,email,userid,formData) =>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/users/${userid}`,
            data:{
                name:name,
                email:email
            },
            headers:{
                authorization:`Bearer ${document.cookie.slice(4)}`
            } 
        })
        if(formData){
            const ress = await axios({
                method:'PATCH',
                url:`/api/v1/users/uploadImage`,
                data:formData,
                headers:{
                    authorization:`Bearer ${document.cookie.slice(4)}`
                } 
            })
        }
        swal("You change your data successfully").then((val)=>{
            location.reload(true)
        })
    }catch(err){
        
    }
}
document.querySelector('.form-user-data').addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const userid = document.getElementById('email').dataset.userid
    const image = document.getElementById('photo').files[0]
    if(image){
        const formData = new FormData();
        formData.append('photo', image);
        changedata(name,email,userid,formData)
    }else{
        changedata(name,email,userid)
    }

})

//----------------- change Password -----------------
//http://127.0.0.1:8000/api
const changePassword = async (Current_password,new_password,password_confirm) =>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/v1/users/UpdatePassword`,
            data:{
                pastPassword:Current_password,
                password:new_password,
                confirmPassword:password_confirm
            },
            headers:{
                authorization:`Bearer ${document.cookie.slice(4)}`
            } 
        })
        const deleteCookie = (name) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        };
        deleteCookie('jwt'); 
        swal("You change your data successfully").then((val)=>{
            location.assign('/')
        })
    }catch(err){
        
    }
}

document.querySelector('.form-user-settings').addEventListener('submit',(e)=>{
    e.preventDefault()
    const Current_password = document.getElementById('password-current').value
    const new_password = document.getElementById('password').value
    const password_confirm = document.getElementById('password-confirm').value
    changePassword(Current_password,new_password,password_confirm)
})
















