import React,{useState} from 'react'

export default function LoginPage() {
    const [formData,setFormData] = useState({
        username:'',
        password:''
      })
    
      const onChangeHandler = (e) =>{
        const {name,value} = e.target;
        setFormData((prev) =>({
          ...prev,
          [name]:value,
        }))
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        if(formData.username == '' || formData.password == ''){
          alert("Please enter credentials")
          return
        }
        const {username,password} = formData;
        try {
          const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username,
              password,
              expiresInMins: 30, // optional, defaults to 60
            }),
          });
      
          if(response.ok){
            alert("Login success")
          }else{
            alert(response.message)
          }
        } catch (error) {
          console.log(error)
        } 
      }
  return (
      <div className='w-screen h-screen bg-blue-300 flex items-center justify-center'>
          <div className='bg-white w-[90%] h-[90%] rounded-xl flex p-10 gap-10 sm:flex-row flex-col'>
              <div className='flex-1 flex flex-col items-center justify-center'>
                  <p className="text-3xl font-bold mb-10 text-start">Login</p>
                  <form onSubmit={(e) => handleSubmit(e)} className='sm:w-[60%] w-[90%] flex flex-col'>
                    <label htmlFor="" className='text-gray-600 text-sm'>Username</label>
                      <input
                          className='py-1 px-2 border-2 border-gray-300 rounded-lg mb-5'
                          name='username'
                          type="text"
                          placeholder='username'
                          value={formData.username}
                          onChange={(e) => onChangeHandler(e)}
                      />
                    <label htmlFor="" className='text-gray-600 text-sm'>Password</label>
                      <input
                          className='py-1 px-2 border-2 border-gray-300 rounded-lg mb-10'
                          name='password'
                          type="password"
                          placeholder='password'
                          value={formData.password}
                          onChange={(e) => onChangeHandler(e)}
                      />
                      <button
                          className='bg-gray-900 text-white w-full rounded-lg py-2'
                          type='submit'
                      >
                          Login
                      </button>
                  </form>
              </div>
              <div className="flex-1">
                  <img
                      className='h-[90%]'
                      src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?t=st=1736260795~exp=1736264395~hmac=999c382d7b025fc1a72218107545dec4fdc1287eec5c54bb9809ac8378fca62c&w=740"

                      alt="login"
                  />
              </div>
          </div>
      </div>
    )
}
