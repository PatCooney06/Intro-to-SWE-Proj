import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoTimeOutline, IoTrophyOutline, IoPersonOutline, IoStarSharp } from "react-icons/io5";

import { PRIMARY_COLOR, BORDER_GREY, SECONDARY_COLOR, TEXT_COLOR, LIGHT_GREY } from "./styles"; 

const navItems = [
    { name: 'Home', path: '/', icon: IoHomeOutline },
    { name: 'History', path: '/history', icon: IoTimeOutline },
    { name: 'Points', path: '/points', icon: IoTrophyOutline },
    { name: 'Profile', path: '/profile', icon: IoPersonOutline },
];

const NavigationBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px', 
            backgroundColor: SECONDARY_COLOR,
            borderTop: `1px solid ${BORDER_GREY}`,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 1000,
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                            padding: '5px 0',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: isActive ? PRIMARY_COLOR : TEXT_COLOR,
                            transition: 'color 0.3s',
                            outline: 'none',
                        }}
                    >
                        <Icon style={{ fontSize: '24px', marginBottom: '2px' }} />
                        <span style={{ fontSize: '10px', fontWeight: isActive ? 'bold' : 'normal' }}>
                            {item.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <div style={{
            height: '60px',
            backgroundColor: SECONDARY_COLOR,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${BORDER_GREY}`,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', color: PRIMARY_COLOR }}>
                <IoStarSharp style={{ marginRight: '8px' }} />
                SmartFit
            </div>
        </div>
    );
};

const AppLayout: React.FC = () => {
    return (
        <div style={{ 
            minHeight: '100vh', 
            paddingTop: '60px',
            paddingBottom: '60px', 
            backgroundColor: LIGHT_GREY
        }}>
            <Header />
                        <main>
                <Outlet />
            </main>
            
            <NavigationBar />
        </div>
    );
};

export default AppLayout;