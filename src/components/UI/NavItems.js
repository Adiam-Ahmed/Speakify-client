import React from 'react';

const NavItems = ({ isLoggedIn }) => {
    console.log(isLoggedIn)
    return (

        <div>
            {isLoggedIn ? (
                <p>User is logged in</p>
            ) : (
                <p>User is not logged in</p>
            )}
        </div>

    );
};

export default NavItems;