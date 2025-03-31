import MainLayout from '@components/Layout/Layout';
import { useContext } from 'react';
import { OurShopContext } from '@/contexts/OurShopProvider';
import ProductItem from '@components/ProductItem/ProductItem';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function ListProducts() {
    const { containerProduct, sectionListProduct, rotate } = styles;
    const {
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        isLoadMore
    } = useContext(OurShopContext);

    return (
        <div className={sectionListProduct}>
            <MainLayout>
                {isLoading ? (
                    <>Loading...</>
                ) : (
                    <>
                        <div className={isShowGrid ? containerProduct : ''}>
                            {products.map(item => (
                                <ProductItem
                                    key={item.id}
                                    src={
                                        'https://pos.nvncdn.com/f2fe44-24897/ps/20230818_WBen1qWfCq.jpeg'
                                    }
                                    prevSrc={
                                        'https://pos.nvncdn.com/f2fe44-24897/ps/20230818_gWTNTGRu66.jpeg'
                                    }
                                    name={item.name}
                                    price={item.price}
                                    details={item}
                                    isHomepage={false}
                                />
                            ))}
                        </div>
                        {products.length < total && (
                            <div
                                style={{
                                    width: '180px',
                                    margin: '50px auto'
                                }}
                            >
                                <Button
                                    content={
                                        isLoadMore ? (
                                            <LoadingTextCommon />
                                        ) : (
                                            'LOAD MORE PRODUCT'
                                        )
                                    }
                                    onClick={handleLoadMore}
                                />
                            </div>
                        )}
                    </>
                )}
            </MainLayout>
        </div>
    );
}

export default ListProducts;
