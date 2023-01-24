import React from 'react';
import { Layout } from '../component/Layout';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ phone, password }) => {
    
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto  max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="phone"
            {...register('phone', { required: 'Please enter phone number', 
        pattern: {
            value:  /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/,
            message: "Please enter a Bangladeshi phone number",
        }
        })}
            className="w-full"
            id="phone"
            autoFocus placeholder='+880'
          ></input>
          {errors.phone && (
            <div className="text-red-500">{errors.phone.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
                required: "Please enter password",
                minLength: {value: 6, message: "Password is more than 5 chars"}
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
           {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
