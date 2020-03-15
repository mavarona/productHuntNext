import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit } from '../components/ui/form';

import useValidate from '../hooks/useValidate';
import validateSignUp from '../validation/validateSignUp';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

const SignUp = () => {

    const { dataForm, errors, handleChange, handleSubmit } = useValidate(INITIAL_STATE, validateSignUp, createCount);

    const  {name, email, password } = dataForm;

    function createCount() {
        console.log('Create Count');
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
                            />
                        </Field>
                        <Field>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Field>
                        <Field>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Field>
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