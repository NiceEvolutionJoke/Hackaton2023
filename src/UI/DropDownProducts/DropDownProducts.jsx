import React, { useEffect, useState } from 'react';
import classes from './DropDownProducts.module.scss';
import classNames from 'classnames';

import { API_URL } from '../../api/axios';

import Loading from '../../components/loading/Loading';
import ProductService from '../../services/productService';
import FilterService from '../../services/filterService';

const DropDownProducts = ({ type, placeholder, onClick }) => {

    const [isLoading, setLoading]  = useState(false);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);

    const getFilter = async (filter='') => {
        setLoading(true);
        try {
            if (type === 'products') {
                let response = await ProductService.getProducts(filter);
                setItems(response.data[type]);
            } else if (type === 'stores') {
                let response = await FilterService.get(type, filter);
                setItems(response.data[type]);
            }
        } catch (e) {
            console.error(e.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFilter();
    }, []);

    return (
        isLoading 
            ?   <Loading />
            :   <div className={classes.DropDownFilter}>
                    
                    <div className={classNames(classes.DropDownFilter__block, classes.active)}>
                        <div className={classes.DropDownFilter__input}>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1388 13.9331L10.8446 9.66753C11.6764 8.64692 12.1772 7.35005 12.1772 5.93757C12.1772 2.66386 9.49562 0.00012207 6.19993 0.00012207C2.90424 0.00012207 0.222656 2.66383 0.222656 5.93754C0.222656 9.21126 2.90427 11.875 6.19996 11.875C7.62191 11.875 8.92749 11.3775 9.95494 10.5513L14.2492 14.8168C14.3718 14.9387 14.5329 15 14.694 15C14.8551 15 15.0162 14.9387 15.1388 14.8168C15.3848 14.5725 15.3848 14.1775 15.1388 13.9331ZM6.19996 10.625C3.59762 10.625 1.48104 8.52253 1.48104 5.93754C1.48104 3.35256 3.59762 1.25009 6.19996 1.25009C8.80229 1.25009 10.9189 3.35256 10.9189 5.93754C10.9189 8.52253 8.80226 10.625 6.19996 10.625Z" fill="#CBCBCB" />
                            </svg>
                            <input type="text" value={search} onBlur={() => getFilter('?search=' + search)} onChange={e => setSearch(e.target.value)} placeholder={placeholder} />
                        </div>
                        <div className={classes.DropDownFilter__items}>
                            {items.map(item => {
                                return  <div key={item.id} className={classes["popup-subitem"]}>
                                            {type === 'products'
                                                ?   <div className={classes["popup-subitem__img"]}>
                                                        <img src={item.images.length > 0 ? `${API_URL}/images/${item.images[0].name}` : null} alt="" />
                                                    </div>
                                                :   null
                                            }
                                            <div className={classes["popup-subitem__title"]}>
                                                {item.name}
                                            </div>
                                            <div className={classes["popup-subitem__add"]} onClick={() => onClick(item)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" fill="#FFFCFB" stroke="#391E3B" strokeWidth="1.5" />
                                                    <path d="M12 7V17" stroke="#391E3B" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M7 12H17" stroke="#391E3B" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                        </div>
                            })}
                        </div>
                        
                    </div>
                </div>
    );
}

export default DropDownProducts;
