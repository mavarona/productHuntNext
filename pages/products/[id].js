import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout'; 
import Error404 from '../../components/layout/Error404';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Field, InputSubmit } from '../../components/ui/form';
import Button from '../../components/ui/Button';
 
const ContainerProduct = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;

const Product = () => {

    const [product, saveProduct] = useState({});
    const [error, saveError] = useState(false);

    const router = useRouter();
    const { query: {id} } = router;

    const {firebase } = useContext(FirebaseContext);

    useEffect( () => {
        if(id){
            const getProduct = async() => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if(product.exists){
                    saveProduct(product.data());
                }else{
                    saveError(true);
                }
            }
            getProduct();
        }
    }, [id]);

    if(Object.keys(product).length === 0) return 'Loading...';

    const { name, company, url, urlImage, description, votes, comments, createdAt, creator} = product;

    const voteProduct = () => {
        
    } 

    return ( 
        <Layout>
            <>
                {error && <Error404/>}
                <div className="contenedor">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>
                        {name}
                    </h1>
                    <ContainerProduct>
                        <div>
                            <p>Publicado hace: { formatDistanceToNow( new Date(createdAt), {locale: es} )} </p>
                            <p>By: {creator.name} of {company} </p>
                            <img src={urlImage} />
                            <p>{description}</p>

                            <h2>Add Comment</h2>
                            <form>
                                <Field>
                                    <input 
                                        type="text"
                                        name="message"
                                    />
                                </Field>
                                <InputSubmit 
                                    type="submit"
                                    value="Add Comment"
                                />
                                <h2 css={css`
                                    margin: 2rem;
                                `}>Comments</h2>
                                {comments.map(comment => (
                                    <li>
                                        <p>{comment.name}</p>
                                        <p>Published by: {comment.userName}</p>
                                    </li>
                                ))}
                            </form>
                        </div>
                        <aside>
                            <Button
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visit URL</Button>
                            <p css={css`
                                        text-align: center;
                            `}>{votes} Votes</p>
                            <Button
                                onClick={voteProduct}
                            >
                                Vote
                            </Button>
                        </aside>                    
                    </ContainerProduct>
                </div>
            </>
        </Layout>
     )
}

export default Product;