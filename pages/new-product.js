import React, { useState, useContext  } from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/form';

import { FirebaseContext } from '../firebase';

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

        const [nameImage, setNameImage] = useState('');
        const [uploading, setUploading] = useState(false);
        const [progress, setProgress] = useState(0);
        const [urlImage, setUrlImage] = useState('');

        const [error, setError] = useState('');

        const { dataForm, errors, handleChange, handleSubmit, handlerBlur } = useValidate(INITIAL_STATE, validateCreateProduct, createProduct);

        const { name, company, imageProduct, url, description } = dataForm;

        const router = useRouter();

        const { user, firebase } = useContext(FirebaseContext);

        async function createProduct() {
            if (!user) {
                return router.push('/login');
            }

            const product = {
                name,
                company,
                url,
                urlImage,
                description,
                votes: 0,
                comments: [],
                createdAt: Date.now(),
                creator: {
                    id: user.uid,
                    name: user.displayName
                }
            }

            firebase.db.collection('products').add(product);

        }

        const handleUploadStart = () => {
            setProgress(0);
            setUploading(true);
        }

        const handleProgress = progress => setProgress({ progress });

        const handleUploadError = err => {
            setUploading(err);
            console.error(err);
        };

        const handleUploadSuccess = name => {
            setProgress(100);
            setUploading(false);
            setNameImage(name);
            firebase
                .storage
                .ref("products")
                .child(name)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                    setUrlImage(url);
                });
        };

        return ( <
                div >
                <
                Layout >
                <
                >
                <
                h1 css = { css `
                            text-align: center;
                            margin-top: 5rem;
                        ` } >
                New Product < /h1> <
                Form onSubmit = { handleSubmit } >
                <
                fieldset >
                <
                legend > Information Product < /legend> <
                Field >
                <
                label htmlFor = "name" > Name < /label> <
                input type = "text"
                id = "name"
                placeholder = "Name"
                name = "name"
                value = { name }
                onChange = { handleChange }
                onBlur = { handlerBlur }
                /> < /
                Field > {
                    errors.name && < Error > { errors.name } < /Error>} <
                    Field >
                    <
                    label htmlFor = "company" > Company < /label> <
                    input
                    type = "text"
                    id = "company"
                    placeholder = "Company"
                    name = "company"
                    value = { company }
                    onChange = { handleChange }
                    onBlur = { handlerBlur }
                    /> < /
                    Field > {
                        errors.company && < Error > { errors.company } < /Error>} <
                        Field >
                        <
                        label htmlFor = "imageProduct" > Image < /label> <
                        FileUploader
                        accept = "image"
                        id = "imageProduct"
                        name = "imageProduct"
                        randomizeFilename
                        storageRef = { firebase.storage.ref("products") }
                        onUploadStart = { handleUploadStart }
                        onUploadError = { handleUploadError }
                        onUploadSuccess = { handleUploadSuccess }
                        onProgress = { handleProgress }
                        /> < /
                        Field > <
                        Field >
                        <
                        label htmlFor = "url" > URL < /label> <
                        input
                        type = "url"
                        id = "url"
                        name = "url"
                        placeholder = "Url Product"
                        value = { url }
                        onChange = { handleChange }
                        onBlur = { handlerBlur }
                        /> < /
                        Field > {
                            errors.url && < Error > { errors.url } < /Error>} < /
                            fieldset > <
                            fieldset >
                            <
                            legend > About Product < /legend> <
                            Field >
                            <
                            label htmlFor = "description" > Description < /label> <
                            textarea
                            id = "description"
                            name = "description"
                            value = { description }
                            onChange = { handleChange }
                            onBlur = { handlerBlur }
                            /> < /
                            Field > {
                                errors.description && < Error > { errors.description } < /Error>} < /
                                fieldset > {
                                    error && < Error > { error } < /Error>} <
                                    InputSubmit
                                    type = "submit"
                                    value = "Create Product" /
                                    >
                                    <
                                    /Form> < /
                                    > <
                                    /Layout> < /
                                    div >
                                )
                            }

                            export default NewProduct;