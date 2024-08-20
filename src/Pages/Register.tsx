import React, { useState } from 'react';
import { FormRow, Logo } from "../Components";
import Wrapper from "../assets/wrappers/RegisterPage";

interface InitialState {
  name: string;
  email: string;
  password: string;
  isEnumMember: boolean;
};

const initialState: InitialState = {
  name: "",
  email: "",
  password: "",
  isEnumMember: true,
};

const Register = () => {
  const [values, setValues] = useState<InitialState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  const toggleMembership = () => {
    setValues({ ...values, isEnumMember: !values.isEnumMember });
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        {/* name field */}
        <FormRow type="text" name="name" value={values.name} handleChange={handleChange} labelText="Name" />
        {/* e-mail field */}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email" />
        {/* password field */}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password" />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;