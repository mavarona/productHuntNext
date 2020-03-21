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

const CreatorProduct = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Product = () => {

    const [product, saveProduct] = useState({});
    const [error, saveError] = useState(false);
    const [comment, setComment] = useState({});

    const router = useRouter();
    const { query: {id} } = router;

    const {firebase, user } = useContext(FirebaseContext);

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
    }, [id, product]);

    if(Object.keys(product).length === 0) return 'Loading...';

    const { name, company, url, urlImage, description, votes, comments, createdAt, creator, hasVoted} = product;

    const voteProduct = () => {
        if(!user) {
            return router.push('/login')
        }

        const newTotal = Number(votes) + 1;

        if(hasVoted.includes(user.uid) ) return;

        const newHasVoted = [...hasVoted, user.uid];

        //  Actualizar en la BD
        firebase.db.collection('products').doc(id).update({ 
            votes: newTotal,
            hasVoted: newHasVoted
        });

        // Actualizar el state
        saveProduct({
            ...product,
            votes: newTotal
        })

    }
    
    const handleChangeComment = e => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    const addComment = e => {
        e.preventDefault();

        if(!user){
            return router.push('/login');
        }

        comment.userId = user.uid;
        comment.name = user.displayName;
        
        const newComments = [...comments, comment];

        firebase.db.collection('products').doc(id).update({
            comments: newComments
        });

        saveProduct({
            ...product,
            comments: newComments
        });

    }

    const isCreator = id => {
        return creator.id === id;
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

                            { user && (
                                <>
                                    <h2>Add Comment</h2>
                                    <form 
                                        onSubmit={addComment}
                                    >
                                        <Field>
                                            <input 
                                                type="text"
                                                name="message"
                                                onChange={handleChangeComment}
                                            />
                                        </Field>
                                        <InputSubmit 
                                            type="submit"
                                            value="Add Comment"
                                        />
                                    </form>
                                </> 
                            ) }

                            <h2 css={css`
                                    margin: 2rem;
                                `}>Comments</h2>
                                {comments.length === 0 ? 'No Comments' :
                                (
                                    <ul>
                                    {comments.map((comment, i) => (
                                        <li
                                            key={`${comment.userId}-${i}`}
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}
                                        >
                                            <p>{comment.message}</p>
                                            <p>Published by: 
                                                <span
                                                    css={css`
                                                        font-weight: bold;
                                                    `}
                                                >
                                                    {' '}{comment.name}
                                                </span>
                                            </p>
                                            { isCreator(comment.userId) && <CreatorProduct>Is Creator</CreatorProduct> }
                                        </li>
                                    ))}    
                                </ul>
                                )}
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
                            { user && (
                                    <Button
                                    onClick={voteProduct}
                                >
                                    Vote
                                </Button>
                                )
                            }
                        </aside>                    
                    </ContainerProduct>
                </div>
            </>
        </Layout>
     )
}

export default Product;