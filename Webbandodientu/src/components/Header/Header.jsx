import BoxIcon from './BoxIcon/BoxIcon';
import Search from './Search/Search';
import { Image } from 'primereact/image';
import { dataBoxIcon, dataMenu } from './constants';
import styles from './styles.module.scss';
import Logo from '@icons/images/logoBanlinhkien.png';
import { TfiReload } from 'react-icons/tfi';
import { BsHeart } from 'react-icons/bs';
import { PiShoppingCart } from 'react-icons/pi';
import useScrollHandling from '@/hooks/useScrollHandling';
import { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';
function MyHeader() {
    const {
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        container,
        fixedHeader,
        topHeader,
        boxCart,
        quantity
    } = styles;
    const navigate = useNavigate();
    const { scrollPosition } = useScrollHandling();
    const [fixedPosition, setFixedPosition] = useState(false);
    const {
        setIsOpen,
        setType,
        listProductCart,
        userId,
        handleGetListProductsCart
    } = useContext(SideBarContext);

    const handleOpenSideBar = type => {
        setIsOpen(true);
        setType(type);
    };

    const handleOpenCartSideBar = () => {
        handleGetListProductsCart(userId, 'cart');
        handleOpenSideBar('cart');
    };

    useEffect(() => {
        setFixedPosition(scrollPosition > 80);
    }, [scrollPosition]);

    return (
        <div
            className={classNames(container, topHeader, {
                [fixedHeader]: fixedPosition
            })}
        >
            <div className={containerHeader}>
                <div className={containerBox}>
                    {/* <div className={containerBoxIcon}>
                        {dataBoxIcon.map(item => {
                            return (
                                <BoxIcon type={item.type} href={item.href} />
                            );
                        })}
                    </div> */}
                    <div className={containerMenu}>
                        <div>
                            <Image
                                style={{ cursor: 'pointer' }}
                                src={Logo}
                                alt='Logo'
                                width='300px'
                                onClick={() => {
                                    navigate('/');
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={containerBox}>
                    <Search />
                </div>

                <div className={containerBox}>
                    <div className={containerMenu}>
                        {/* render tiep menu */}
                        {/* {dataMenu.slice(3, dataMenu.length).map(item => {
                            return (
                                <Menu content={item.content} href={item.href} />
                            );
                        })} */}
                    </div>

                    <div className={containerBoxIcon}>
                        <TfiReload
                            style={{
                                fontSize: '20px'
                            }}
                            onClick={() => handleOpenSideBar('compare')}
                        />
                        <BsHeart
                            style={{
                                fontSize: '20px'
                            }}
                            onClick={() => handleOpenSideBar('wishlist')}
                        />
                        <div className={boxCart}>
                            <PiShoppingCart
                                style={{
                                    fontSize: '25px'
                                }}
                                onClick={() => handleOpenCartSideBar()}
                            />

                            <div className={quantity}>
                                {listProductCart.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
