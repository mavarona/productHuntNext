import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAuthenticated from '../hooks/useAuthenticated';

const MyApp = (props) => {

    const user = useAuthenticated();

    const { Component, pageProps } = props; 

    return(
        <FirebaseContext.Provider
            value={{
                firebase,
                user
            }}
        >
            <Component {...pageProps} />

        </FirebaseContext.Provider>
    )

}

export default MyApp;