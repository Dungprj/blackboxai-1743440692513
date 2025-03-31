import { useState } from 'react';
import { createContext } from 'react';
import { getCart } from '@/apis/cartService';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const SideBarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [detailProduct, setDetailProduct] = useState(null);
    const userId = Cookies.get('userId');

    const handleGetListProductsCart = (userId, type) => {
        if (userId && type === 'cart') {
            setIsLoading(true);
            getCart(userId)
                .then((res) => {
                    setListProductCart(res.data.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setListProductCart([]);
                    setIsLoading(false);
                });
        }
    };

    const value = {
        isOpen,
        setIsOpen,
        type,
        setType,
        handleGetListProductsCart,
        listProductCart,
        isLoading,
        setIsLoading,
        userId,
        detailProduct,
        setDetailProduct,
        setListProductCart
    };

    return (
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    );
};
