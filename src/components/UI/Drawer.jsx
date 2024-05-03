import React from 'react';

const Drawer = () => {
    return (
        <div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">DashBoard</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>Sidebar Item 1</li>
                        <li>Sidebar Item 2</li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Drawer;