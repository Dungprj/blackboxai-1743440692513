import { getDetailProduct, getRelatedProduct } from '@/apis/productsService';
import InformationProduct from '@/pages/DetailProduct/components/Infomation';
import ReviewProduct from '@/pages/DetailProduct/components/Review';
import { handleAddProductToCartCommon } from '@/utils/helper';
import AccordionMenu from '@components/AccordionMenu';
import Button from '@components/Button/Button';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import cls from 'classnames';
import { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { TfiReload } from 'react-icons/tfi';
import { useNavigate, useParams } from 'react-router-dom';
import ReactImageMagnifier from 'simple-image-magnifier/react';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import Cookies from 'js-cookie';
import { addProductToCart } from '@/apis/cartService';
import { Galleria } from 'primereact/galleria';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

function DetailProduct() {
    const {
        container,
        navigateSection,
        contentSection,
        price,
        imageBox,
        imageBoxItem,
        infoBox,
        description,
        boxSize,
        size,
        titleSize,
        functionInfo,
        boxBtn,
        incrementAmount,
        orSection,
        addFunc,
        info,
        active,
        clear,
        activeDisabledBtn,
        loading,
        emptyData
    } = styles;

    const [menuSelected, setMenuSelected] = useState(1);
    const [sizeSelected, setSizeSelected] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState();
    const [relatedData, setRelatedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    const { setIsOpen, setType, handleGetListProductsCart } =
        useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('userId');
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isLoadingBtnBuyNow, setIsLoadingBtnBuyNow] = useState(false);

    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); // Quản lý ảnh đang hiển thị

    // Dữ liệu ảnh mẫu
    useEffect(() => {
        const data = [
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/ps/20230812_uYm8JxNdLJ.jpeg',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/ps/20230812_uYm8JxNdLJ.jpeg',
                alt: 'Banner 1'
            },
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/ps/20230809_a9QMy9yPdw.jpeg',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/ps/20230809_a9QMy9yPdw.jpeg',
                alt: 'Banner 2'
            },
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/ps/20230812_uYm8JxNdLJ.jpeg',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/ps/20230812_uYm8JxNdLJ.jpeg',
                alt: 'Banner 3'
            }
        ];
        setImages(data);
    }, []);

    // Template cho ảnh lớn
    const itemTemplate = item => {
        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt}
                style={{ width: '100%', display: 'block' }}
            />
        );
    };

    // Template cho thumbnail (không cần trong Galleria vì ta sẽ tự tạo)
    const thumbnailTemplate = item => {
        return (
            <img
                src={item.thumbnailImageSrc}
                alt={item.alt}
                style={{ width: '100px', height: '60px', objectFit: 'cover' }}
            />
        );
    };

    // Xử lý khi hover vào thumbnail
    const handleThumbnailHover = index => {
        setActiveIndex(index); // Cập nhật activeIndex để hiển thị ảnh lớn tương ứng
    };

    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'ADDITIONAL INFORMATION',
            content: <InformationProduct />
        },
        {
            id: 2,
            titleMenu: 'REVIEW (0)',
            content: <ReviewProduct />
        }
    ];

    const handleRenderZoomImage = src => {
        return (
            <ReactImageMagnifier
                srcPreview={src}
                srcOriginal={src}
                width={295}
                height={350}
            />
        );
    };

    const handleSetMenuSelected = id => {
        setMenuSelected(id);
    };

    const handleSelectedSize = size => {
        setSizeSelected(size);
    };

    const handleClearSizeSeleted = () => {
        setSizeSelected('');
    };

    const handleSetQuantity = type => {
        if (quantity < 1) return;

        setQuantity(prev =>
            type === INCREMENT ? (prev += 1) : quantity === 1 ? 1 : (prev -= 1)
        );
    };

    const fetchDataDetail = async id => {
        setIsLoading(true);
        try {
            const data = await getDetailProduct(id);

            setData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Có lỗi khi tải dữ liệu');
            setData();
            setIsLoading(false);
        }
    };

    const fetchDataRelatedProduct = async id => {
        setIsLoading(true);
        try {
            const data = await getRelatedProduct(id);
            setRelatedData(data);
            setIsLoading(false);
        } catch (error) {
            setRelatedData([]);
            toast.error('Có lỗi khi tải dữ liệu');
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        handleAddProductToCartCommon(
            userId,
            setIsOpen,
            setType,
            toast,
            sizeSelected,
            param.id,
            quantity,
            setIsLoadingBtn,
            handleGetListProductsCart
        );
    };

    const handleBuyNow = () => {
        const data = {
            userId,
            productId: param.id,
            quantity,
            size: sizeSelected
        };

        setIsLoadingBtnBuyNow(true);
        addProductToCart(data)
            .then(res => {
                toast.success('Add Product to cart successfully!');
                setIsLoadingBtnBuyNow(false);
                navigate('/cart');
            })
            .catch(err => {
                toast.error('Add Product to cart failed!');
                setIsLoadingBtnBuyNow(false);
            });
    };

    useEffect(() => {
        if (param.id) {
            fetchDataDetail(param.id);
            fetchDataRelatedProduct(param.id);
        }
    }, [param]);

    return (
        <div>
            <MyHeader />

            <div className={container}>
                <MainLayout>
                    <div className={navigateSection}>
                        <div>Home {'>'} Men</div>
                        <div className='' style={{ cursor: 'pointer' }}>
                            {'<'} Return to previous page{' '}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={loading}>
                            <LoadingTextCommon />
                        </div>
                    ) : (
                        <>
                            {!data ? (
                                <div className={emptyData}>
                                    <p>No Result</p>
                                    <div>
                                        <Button
                                            content={'Back to Our Shop'}
                                            onClick={() => navigate('/shop')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className={contentSection}>
                                    <div className={imageBox}>
                                        {/* Galleria chính */}
                                        <Galleria
                                            value={images}
                                            activeIndex={activeIndex}
                                            onItemChange={e =>
                                                setActiveIndex(e.index)
                                            } // Cập nhật activeIndex khi người dùng chuyển ảnh
                                            showThumbnails={false} // Tắt thumbnail mặc định của Galleria
                                            item={itemTemplate}
                                            style={{ width: '100%' }}
                                        />

                                        {/* Danh sách thumbnail tùy chỉnh */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                marginTop: '10px',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    onMouseEnter={() =>
                                                        handleThumbnailHover(
                                                            index
                                                        )
                                                    } // Khi hover, cập nhật activeIndex
                                                    style={{
                                                        cursor: 'pointer',
                                                        border:
                                                            activeIndex ===
                                                            index
                                                                ? '2px solid #007bff'
                                                                : '1px solid #ddd', // Highlight thumbnail đang active
                                                        padding: '2px',
                                                        borderRadius: '4px',
                                                        transition:
                                                            'border 0.3s'
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            image.thumbnailImageSrc
                                                        }
                                                        alt={image.alt}
                                                        style={{
                                                            width: '100px',
                                                            height: '60px',
                                                            objectFit: 'cover',
                                                            display: 'block'
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={infoBox}>
                                        <h1>{data?.name}</h1>
                                        <p className={price}>${data?.price}</p>
                                        <p className={description}>
                                            {data?.description}
                                        </p>

                                        <p className={titleSize}>
                                            Size {sizeSelected}
                                        </p>
                                        <div className={boxSize}>
                                            {data?.size.map(
                                                (itemSize, index) => {
                                                    return (
                                                        <div
                                                            className={cls(
                                                                size,
                                                                {
                                                                    [active]:
                                                                        sizeSelected ===
                                                                        itemSize.name
                                                                }
                                                            )}
                                                            key={index}
                                                            onClick={() =>
                                                                handleSelectedSize(
                                                                    itemSize.name
                                                                )
                                                            }
                                                        >
                                                            {itemSize.name}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        {sizeSelected && (
                                            <p
                                                className={clear}
                                                onClick={handleClearSizeSeleted}
                                            >
                                                clear
                                            </p>
                                        )}

                                        <div className={functionInfo}>
                                            <div className={incrementAmount}>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            DECREMENT
                                                        )
                                                    }
                                                >
                                                    -
                                                </div>
                                                <div>{quantity}</div>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            INCREMENT
                                                        )
                                                    }
                                                >
                                                    +
                                                </div>
                                            </div>

                                            <div className={boxBtn}>
                                                <Button
                                                    content={
                                                        isLoadingBtn ? (
                                                            <LoadingTextCommon />
                                                        ) : (
                                                            'Add to Cart'
                                                        )
                                                    }
                                                    customClassname={
                                                        !sizeSelected &&
                                                        activeDisabledBtn
                                                    }
                                                    onClick={handleAdd}
                                                />
                                            </div>
                                        </div>

                                        <div className={orSection}>
                                            <div></div>
                                            <span>OR</span>
                                            <div></div>
                                        </div>

                                        <div>
                                            <Button
                                                content={
                                                    isLoadingBtnBuyNow ? (
                                                        <LoadingTextCommon />
                                                    ) : (
                                                        'Buy now'
                                                    )
                                                }
                                                customClassname={
                                                    !sizeSelected &&
                                                    activeDisabledBtn
                                                }
                                                onClick={handleBuyNow}
                                            />
                                        </div>

                                        <div className={addFunc}>
                                            <div>
                                                <CiHeart />
                                            </div>

                                            <div>
                                                <TfiReload />
                                            </div>
                                        </div>

                                        <div>
                                            <PaymentMethods />
                                        </div>

                                        <div className={info}>
                                            <div>
                                                Brand: <span>Brand 03</span>
                                            </div>

                                            <div>
                                                SKU: <span>87654</span>
                                            </div>

                                            <div>
                                                Category: <span>Men</span>
                                            </div>
                                        </div>

                                        {dataAccordionMenu.map(
                                            (item, index) => (
                                                <AccordionMenu
                                                    titleMenu={item.titleMenu}
                                                    contentJsx={item.content}
                                                    key={index}
                                                    onClick={() =>
                                                        handleSetMenuSelected(
                                                            item.id
                                                        )
                                                    }
                                                    isSelected={
                                                        menuSelected === item.id
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {relatedData.length ? (
                        <div>
                            <h2>Related products</h2>

                            <SliderCommon
                                data={relatedData}
                                isProductItem
                                showItem={4}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </MainLayout>
            </div>

            <MyFooter />
        </div>
    );
}

export default DetailProduct;
