import React, { useState } from 'react';
import { FormRow, Logo } from "../Components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from 'react-toastify';

interface InitialState {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
};

const initialState: InitialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState<InitialState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password,isMember } = values;
    if(!email || !password ||!isMember && !name){
      toast.error('Please Fill Out All Fields');
      return;
    }
  };

  const toggleMembership = () => {
    setValues({ ...values, isMember: !values.isMember });
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember?"Login":"Register"}</h3>
        {/* name field */}
        {!values.isMember&&<FormRow type="text" name="name" value={values.name} handleChange={handleChange} labelText="Name" />}
        {/* e-mail field */}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email" />
        {/* password field */}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password" />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>testing <button type='button' onClick={toggleMembership}>testing</button></p>
      </form>
    </Wrapper>
  );
};

export default Register;