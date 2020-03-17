import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/form';

import firebase from '../firebase';

import useValidate from '../hooks/useValidate';
import validateLogin from '../validation/validateLogin';

const INITIAL_STATE = {
    email: '',
    password: ''
}

const Login = () => {

    const [error, setError] = useState('');

    const { dataForm, errors, handleChange, handleSubmit, handlerBlur } = useValidate(INITIAL_STATE, validateLogin, login);

    const  { email, password } = dataForm;

    async function login() {
        try {
            await firebase.login(email, password);
            Router.push('/');
        } catch (err) {
            console.log('Error in login');
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
                    >Login</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
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
                            value= "Login"
                        />
                    </Form>
                </>
            </Layout>
        </div>
    )
}

export default Login;