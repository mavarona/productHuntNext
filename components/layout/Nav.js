import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

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
    return(
        <Navig>
            <Link href="/">Home</Link>
            <Link href="/popular">Popular</Link>
            <Link href="/new-product">New Product</Link>
        </Navig>
    )
}

export default Nav;