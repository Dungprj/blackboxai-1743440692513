import React, { useState, useCallback } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import SuggestionItem from '../SuggesstionItem/SuggesstionItem';

// Custom hook useDebounce
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Search = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const debouncedValue = useDebounce(value, 500); // Delay 500ms

    // Danh sách mẫu để gợi ý (có cả giá và ảnh)
    const items = [
        {
            name: 'Cảm Biến Âm Thanh Microphone Amplifier MAX4466',
            price: 'Giá: 30.000đ',
            image: 'https://via.placeholder.com/50' // Thay bằng URL ảnh thực tế
        },
        {
            name: 'Bộ Kit Học Tập Inventor Cho Micro:bit Chính Hãng Grove',
            price: 'Giá: 600.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Vi Phần Sương Siêu Âm Hơi Nước Tạo Âm 10 Mắt 48V/5A',
            price: 'Giá: 1.550.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Bộ Nháy Theo Nhạc LED FULL 1 Cột BLK Music Plus 2023 (Kèm Hộp)',
            price: 'Giá: 450.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Tụ Hóa 4700uF 50V 18X35MM',
            price: 'Giá: 9.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'A03401 SOT23-3 MOSFET P-1CH 4A 30V(A1/9T)X1_X1(GL)6C',
            price: 'Giá: 3.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Module Lora RF433 SX1278 RA-01',
            price: 'Giá: 165.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Kit Arduino WIFI ESP-32 ESP-WROOM-325 CH340 UNO HSG',
            price: 'Giá: 290.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Module PLC FX3U-14MT',
            price: 'Giá: 750.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Cổng Tắc WIFI 1 RELAY SONOFF BASIC EWELINK CE-1A',
            price: 'Giá: 165.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Cảm Biến Âm Thanh Microphone Amplifier MAX4466',
            price: 'Giá: 30.000đ',
            image: 'https://via.placeholder.com/50' // Thay bằng URL ảnh thực tế
        },
        {
            name: 'Bộ Kit Học Tập Inventor Cho Micro:bit Chính Hãng Grove',
            price: 'Giá: 600.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Vi Phần Sương Siêu Âm Hơi Nước Tạo Âm 10 Mắt 48V/5A',
            price: 'Giá: 1.550.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Bộ Nháy Theo Nhạc LED FULL 1 Cột BLK Music Plus 2023 (Kèm Hộp)',
            price: 'Giá: 450.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Tụ Hóa 4700uF 50V 18X35MM',
            price: 'Giá: 9.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'A03401 SOT23-3 MOSFET P-1CH 4A 30V(A1/9T)X1_X1(GL)6C',
            price: 'Giá: 3.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Module Lora RF433 SX1278 RA-01',
            price: 'Giá: 165.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Kit Arduino WIFI ESP-32 ESP-WROOM-325 CH340 UNO HSG',
            price: 'Giá: 290.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Module PLC FX3U-14MT',
            price: 'Giá: 750.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Cổng Tắc WIFI 1 RELAY SONOFF BASIC EWELINK CE-1A',
            price: 'Giá: 165.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Cảm Biến Âm Thanh Microphone Amplifier MAX4466',
            price: 'Giá: 30.000đ',
            image: 'https://via.placeholder.com/50' // Thay bằng URL ảnh thực tế
        },
        {
            name: 'Bộ Kit Học Tập Inventor Cho Micro:bit Chính Hãng Grove',
            price: 'Giá: 600.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Vi Phần Sương Siêu Âm Hơi Nước Tạo Âm 10 Mắt 48V/5A',
            price: 'Giá: 1.550.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Bộ Nháy Theo Nhạc LED FULL 1 Cột BLK Music Plus 2023 (Kèm Hộp)',
            price: 'Giá: 450.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Tụ Hóa 4700uF 50V 18X35MM',
            price: 'Giá: 9.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'A03401 SOT23-3 MOSFET P-1CH 4A 30V(A1/9T)X1_X1(GL)6C',
            price: 'Giá: 3.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Module Lora RF433 SX1278 RA-01',
            price: 'Giá: 165.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Kit Arduino WIFI ESP-32 ESP-WROOM-325 CH340 UNO HSG',
            price: 'Giá: 290.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Module PLC FX3U-14MT',
            price: 'Giá: 750.000đ',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Cổng Tắc WIFI 1 RELAY SONOFF BASIC EWELINK CE-1A',
            price: 'Giá: 165.000đ',
            image: 'https://via.placeholder.com/50'
        }
    ];

    const searchSuggestions = useCallback(event => {
        const query = event.query.toLowerCase();
        const filteredSuggestions = items.filter(item =>
            item.name.toLowerCase().includes(query)
        );
        setSuggestions(filteredSuggestions);
    }, []);

    // Theo dõi giá trị debounced để xử lý nếu cần (ví dụ: call API)
    React.useEffect(() => {
        if (debouncedValue) {
            console.log('Searching for:', debouncedValue);
            // Ở đây bạn có thể thêm logic như gọi API với debouncedValue
        }
    }, [debouncedValue]);

    const handleSearch = () => {
        if (value) {
            console.log('Performing search for:', value);
            // Thêm logic tìm kiếm tại đây, ví dụ: chuyển hướng hoặc gọi API
        }
    };

    // Template cho gợi ý
    const itemTemplate = item => {
        return <SuggestionItem item={item} />;
    };

    return (
        <div
            className='search-container'
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
            <AutoComplete
                value={value}
                suggestions={suggestions}
                completeMethod={searchSuggestions}
                onChange={e => setValue(e.value)}
                placeholder='Tìm kiếm...'
                style={{ width: '500px' }}
                inputStyle={{ width: '500px' }}
                dropdown={false} // Không hiển thị nút dropdown mặc định của AutoComplete
                panelStyle={{
                    width: '350px', // Chiều rộng panel gợi ý
                    maxHeight: '350px', // Chiều cao tối đa 350px
                    overflowY: 'auto',

                    marginTop: '5px', // Khoảng cách từ input đến panel
                    border: '1px solid #e0e0e0', // Viền nhẹ cho panel
                    borderRadius: '4px', // Bo góc
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' // Đổ bóng nhẹ
                }}
                itemTemplate={itemTemplate} // Sử dụng template tùy chỉnh'
                field='name' // Trường để hiển thị giá trị trong input
            />
            <Button
                icon='pi pi-search'
                className='p-button-rounded p-button-primary'
                onClick={handleSearch}
                style={{ height: '40px', width: '40px' }}
            />
        </div>
    );
};

export default Search;
