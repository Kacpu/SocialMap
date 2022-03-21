import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivatePage = () => <h3>To jest strona prywatna.</h3>;

export default withAuthenticationRequired(PrivatePage, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
});