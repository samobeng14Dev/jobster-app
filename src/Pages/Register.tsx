import React from 'react'
import { useState,useEffect } from 'react'
import {Logo} from "../Components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { isEnumMember } from 'typescript'

type IntialState={
  name:string,
  email:string,
  password:string,
  isEnumMember:boolean,
}
const initialState:IntialState={
  name:"",
  email:"",
  password:"",
  isEnumMember:true,
}
const Register=()=> {
  const [values,setValues]=useState<IntialState>(initialState)

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value);
    
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(values);
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo/>
        <h3>Login</h3>
         {/* name field */}
         <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
        </form>
    </Wrapper>
  )
}

export default Register