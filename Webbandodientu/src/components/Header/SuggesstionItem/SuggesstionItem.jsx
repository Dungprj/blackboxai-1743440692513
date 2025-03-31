import React from 'react';
import { Image } from 'primereact/image';

const SuggestionItem = ({ item }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                borderBottom: '1px solid #e0e0e0',
                cursor: 'pointer' // Thêm con trỏ để người dùng biết có thể click
            }}
        >
            {/* Ảnh sản phẩm */}
            <div>
                <Image
                    src={
                        'https://pos.nvncdn.com/f2fe44-24897/ps/20230818_gWTNTGRu66.jpeg'
                    } // Nếu không có ảnh, dùng placeholder
                    alt={item.name}
                    width='50'
                    height='50'
                    style={{ marginRight: '10px', objectFit: 'contain' }} // Đảm bảo ảnh không bị méo
                />
            </div>

            <div
                style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#333',
                    lineHeight: '1.2'
                }}
            >
                {item.name}
            </div>
            <div
                style={{
                    color: '#e91e63', // Màu hồng giống trong hình
                    fontSize: '12px',
                    fontWeight: '500',
                    marginTop: '4px'
                }}
            >
                {item.price}
            </div>
        </div>
    );
};

export default SuggestionItem;
