import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import styles from '../styles.module.scss'; // Giả sử đường dẫn đúng

function Banner() {
    const {
        containerBanner,
        contentBox,
        title,
        boxBtn,
        countDownBox,
        BannerItem
    } = styles;

    const [images, setImages] = useState(null);

    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    // Không sử dụng targetDate trong code hiện tại, nhưng giữ lại nếu bạn định thêm countdown sau
    const targetDate = '2025-12-31T00:00:00';

    useEffect(() => {
        const data = [
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20240819_srR7m5MK.gif',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20240819_srR7m5MK.gif',
                alt: 'Banner 1'
            },
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20231111_IYVBO4f7.png',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20231111_IYVBO4f7.png',
                alt: 'Banner 2'
            },
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20231017_qyjMDBbk.jpeg',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20231017_qyjMDBbk.jpeg',
                alt: 'Banner 3'
            },
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20230502_pbXVPyhe.png',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20230502_pbXVPyhe.png',
                alt: 'Banner 4'
            },
            {
                itemImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20240819_srR7m5MK.gif',
                thumbnailImageSrc:
                    'https://pos.nvncdn.com/f2fe44-24897/bn/20240819_srR7m5MK.gif',
                alt: 'Banner 5'
            }
        ];
        setImages(data);
    }, []);

    const itemTemplate = item => {
        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt}
                style={{ width: '100%', display: 'block' }} // Thêm display: block để tránh khoảng trống
            />
        );
    };

    const thumbnailTemplate = item => {
        return (
            <img
                src={item.thumbnailImageSrc}
                alt={item.alt}
                style={{ width: '100px', height: '60px', objectFit: 'cover' }} // Tùy chỉnh kích thước thumbnail
            />
        );
    };

    return (
        <div className={containerBanner}>
            <Galleria
                value={images}
                responsiveOptions={responsiveOptions}
                numVisible={5}
                style={{ width: '100%' }}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
                showThumbnails={false}
                showIndicators
                circular // Tùy chọn: lặp lại ảnh
                autoPlay // Tùy chọn: tự động chạy
                transitionInterval={2500} // Thời gian chuyển ảnh (ms)
            />
        </div>
    );
}

export default Banner;
