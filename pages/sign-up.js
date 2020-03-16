import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/form';

import firebase from '../firebase';

import useValidate from '../hooks/useValidate';
import validateSignUp from '../validation/validateSignUp';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

const SignUp = () => {

    const [error, setError] = useState('');

    const { dataForm, errors, handleChange, handleSubmit, handlerBlur } = useValidate(INITIAL_STATE, validateSignUp, createCount);

    const  {name, email, password } = dataForm;

    async function createCount() {
        try {
            await firebase.register(name, email, password);
            Router.push('/');
        } catch (err) {
            console.log('Error to create an user', err.message);
            setError(err.message);
        }
    }
 
    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Sign Up</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Field>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                onBlur={handlerBlur}
                            />
                        </Field>
                        {errors.name && <Error>{errors.name}</Error>}
                        <Field>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handlerBlur}
                            />
                        </Field>
                        {errors.email && <Error>{errors.email}</Error>}
                        <Field>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handlerBlur}
                            />
                        </Field>
                        {errors.password && <Error>{errors.password}</Error>}
                        {error && <Error>{error}</Error>}
                        <InputSubmit 
                            type="submit"
                            value= "Sign Up"
                        />
                    </Form>
                </>
            </Layout>
        </div>
    )

}

export default SignUp;