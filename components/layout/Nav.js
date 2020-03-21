import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';

const Navig = styled.nav`
    padding-left: 2rem;
    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const Nav = () => {

    const {user} = useContext(FirebaseContext);

    return(
        <Navig>
            <Link href="/"><a>Home</a></Link>
            <Link href="/popular"><a>Popular</a></Link>
            {user && (
                <Link href="/new-product"><a>New Product</a></Link>
            )}
        </Navig>
    )
}

export default Nav;