import React, { useState } from 'react';
import { FormRow, Logo } from "../Components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { store, RootState } from '../store';
import { loginUser, registerUser } from '../features/user/userSlice';

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

const Register: React.FC = () => {
  const [values, setValues] = useState<InitialState>(initialState);
  
  
  const {user,isLoading}= useAppSelector((store:RootState) => store.user);
  const dispatch = useAppDispatch();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email:email, password:password }));
      return
    }
    dispatch(registerUser({ name,email,password }));
  };

  const toggleMembership = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={handleChange} labelText="Name" />}
        {/* e-mail field */}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email" />
        {/* password field */}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password" />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>testing <button type='button' onClick={toggleMembership}>testing</button></p>
      </form>
    </Wrapper>
  );
};

export default Register;