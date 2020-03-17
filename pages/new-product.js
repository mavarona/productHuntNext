import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/form';

import firebase from '../firebase';

import useValidate from '../hooks/useValidate';
import validateCreateProduct from '../validation/validateCreateProduct';

const INITIAL_STATE = {
    name: '',
    company: '',
    imageProduct: '',
    url: '',
    description: ''
}

const NewProduct = () => {
    const [error, setError] = useState('');

    const { dataForm, errors, handleChange, handleSubmit, handlerBlur } = useValidate(INITIAL_STATE, validateCreateProduct, createProduct);

    const  {name, company, imageProduct, url, description } = dataForm;

    async function createProduct() {
        console.log('create product');
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
                    >New Product</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <fieldset>
                            <legend>Information Product</legend>
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
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder="Company"
                                    name="company"
                                    value={company}
                                    onChange={handleChange}
                                    onBlur={handlerBlur}
                                />
                            </Field>
                            {errors.company && <Error>{errors.company}</Error>}
                            {/*<Field>
                                <label htmlFor="imageProduct">Image</label>
                                <input
                                    type="file"
                                    id="imageProduct"
                                    name="imageProduct"
                                    value={imageProduct}
                                    onChange={handleChange}
                                    onBlur={handlerBlur}
                                />
                            </Field>
                            {errors.imageProduct && <Error>{errors.imageProduct}</Error>}*/}
                            <Field>
                                <label htmlFor="url">URL</label>
                                <input
                                    type="url"
                                    id="url"
                                    name="url"
                                    placeholder="Url Product"
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handlerBlur}
                                />
                            </Field>
                            {errors.url && <Error>{errors.url}</Error>}
                        </fieldset>
                        <fieldset>
                            <legend>About Product</legend>
                            <Field>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                    onBlur={handlerBlur}
                                />
                            </Field>
                            {errors.description && <Error>{errors.description}</Error>}
                        </fieldset>
                        {error && <Error>{error}</Error>}
                        <InputSubmit 
                            type="submit"
                            value= "Create Product"
                        />
                    </Form>
                </>
            </Layout>
        </div>
    )
}

export default NewProduct;