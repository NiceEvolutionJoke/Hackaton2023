import React, { useEffect, useState } from 'react';
import classes from './DropDownFilter.module.scss';
import classNames from 'classnames';

import { useStore } from '../../store/store';

import FilterService from '../../services/filterService';
import CategoryService from '../../services/categoryService';
import Loading from '../../components/loading/Loading';


const DropDownFilter = ({ type, name, placeholder, items, setItems, onChange, active, values, handleChange, editable=true }) => {

    const {store} = useStore();

    const [isLoading, setLoading]  = useState(false);
    const [search, setSearch] = useState('');

    const getFilter = async (filter='') => {
        setLoading(true);
        try {
            if (type === 'categories' && !filter) filter = '?raw=true';
            else if (type === 'categories') filter += '&raw=true';

            let response = await FilterService.get(type, filter);
            setItems(response.data[type]);
        } catch (e) {
            console.error(e.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFilter();
    }, []);

    const activateAddPopUp = () => {
        if (type === 'categories') {
            store.setItemParents(items.filter(el => el.categoryId === null));
            store.activateAdd(type, CategoryService);
        }
        else store.activateAdd(type, FilterService);
    }

    const activateEditPopUp = (item) => {
        if (type === 'categories') {
            store.setItemParents(items.filter(el => el.categoryId === null));
            store.activateEdit(type, item, CategoryService);
        }
        else store.activateEdit(type, item, FilterService);
    }

    const activateDeletePopUp = (item) => {
        if (type === 'categories') store.activateDelete(type, item, CategoryService);
        else store.activateDelete(type, item, FilterService);
    }

    return (
        isLoading 
            ?   <Loading />
            :   <div className={classes.DropDownFilter}>
                    <div
                        className={active ? classNames(classes.DropDownFilter__btn, classes.active) : classes.DropDownFilter__btn}
                        onClick={onChange}
                    >
                        {name}
                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L9 9L17 1" stroke="#391E3B" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className={active ? classNames(classes.DropDownFilter__block, classes.active) : classes.DropDownFilter__block}>
                        <div className={classes.DropDownFilter__input}>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1388 13.9331L10.8446 9.66753C11.6764 8.64692 12.1772 7.35005 12.1772 5.93757C12.1772 2.66386 9.49562 0.00012207 6.19993 0.00012207C2.90424 0.00012207 0.222656 2.66383 0.222656 5.93754C0.222656 9.21126 2.90427 11.875 6.19996 11.875C7.62191 11.875 8.92749 11.3775 9.95494 10.5513L14.2492 14.8168C14.3718 14.9387 14.5329 15 14.694 15C14.8551 15 15.0162 14.9387 15.1388 14.8168C15.3848 14.5725 15.3848 14.1775 15.1388 13.9331ZM6.19996 10.625C3.59762 10.625 1.48104 8.52253 1.48104 5.93754C1.48104 3.35256 3.59762 1.25009 6.19996 1.25009C8.80229 1.25009 10.9189 3.35256 10.9189 5.93754C10.9189 8.52253 8.80226 10.625 6.19996 10.625Z" fill="#CBCBCB" />
                            </svg>
                            <input type="text" value={search} onBlur={() => getFilter('?search=' + search)} onChange={e => setSearch(e.target.value)} placeholder={placeholder} />
                        </div>
                        <div className={classes.DropDownFilter__items}>
                            {items.map((item) => {
                                return (
                                    <div key={item.id} className={classes.DropDownFilter__item}>
                                        <input 
                                            type="checkbox" name={type} id={item.id} className={classes.DropDownFilter__subinput} 
                                            onChange={() => {
                                                if (values.includes(item.id)) handleChange(type, values.filter(el => el !== item.id));
                                                else handleChange(type, [...values, item.id]);
                                            }}
                                            checked={values.includes(item.id)}
                                        />
                                        <label htmlFor={item.id} className={classes.DropDownFilter__label}>
                                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.27344 5.44444L4.91166 9L13.354 1" stroke="#391E3B" strokeLinecap="round" />
                                            </svg>
                                            {item.name}
                                        </label>
                                        {editable 
                                            ?   <>
                                                    <div className={classes.DropDownFilter__edit} onClick={() => activateEditPopUp(item)}>
                                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.48984 15.0797L1 20L6.01129 18.5877M2.48984 15.0797L6.01129 18.5877M2.48984 15.0797L13.2799 4.22414M6.01129 18.5877L16.7562 7.74487M18.3363 6.15034L19.5867 4.8886C20.3663 4.10185 20.3581 2.83127 19.5683 2.0547L18.897 1.39462C18.1124 0.623173 16.852 0.630407 16.0763 1.41081L14.9052 2.58899M18.3363 6.15034L14.9052 2.58899M18.3363 6.15034L16.7562 7.74487M14.9052 2.58899L13.2799 4.22414M13.2799 4.22414L16.7562 7.74487" stroke="#202020" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className={classes.DropDownFilter__delete} onClick={() => activateDeletePopUp(item)}>
                                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.3387 9.05978H0.66129C0.266129 9.05978 0 8.8016 0 8.41043V5.82085C0 4.78814 0.927419 3.88062 2 3.88062H18C19.0726 3.88062 20 4.78814 20 5.82085V8.41043C20 8.6686 19.7339 9.05978 19.3387 9.05978ZM1.33065 7.7689H18.6694V5.82085C18.6694 5.43749 18.4032 5.17932 18 5.17932H2C1.59677 5.17932 1.33065 5.43749 1.33065 5.82085V7.7689Z" fill="#3A3A3A" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.3397 22H4.66231C2.79941 22 1.33167 20.5761 1.33167 18.7611V8.41057C1.33167 8.02722 1.59779 7.76904 2.00102 7.76904C2.39618 7.76904 2.66231 8.02722 2.66231 8.41057V18.7611C2.66231 19.8016 3.59779 20.7013 4.66231 20.7013H15.3397C16.4042 20.7013 17.3397 19.8016 17.3397 18.7611V8.41057C17.3397 8.02722 17.6059 7.76904 18.001 7.76904C18.4042 7.76904 18.6704 8.02722 18.6704 8.41057V18.7611C18.6704 20.5761 17.2026 22 15.3397 22Z" fill="#3A3A3A" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.3285 4.52981H11.9978V1.94023C11.9978 1.55688 11.7317 1.2987 11.3285 1.2987H8.66718C8.26395 1.2987 7.99782 1.55688 7.99782 1.94023V4.52981H6.66718V1.94023C6.66718 0.907527 7.59459 0 8.66718 0H11.3285C12.401 0 13.3285 0.907527 13.3285 1.94023V4.52981Z" fill="#3A3A3A" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.99785 18.1187C5.59462 18.1187 5.32849 17.8605 5.32849 17.4694V12.2902C5.32849 11.9069 5.59462 11.6487 5.99785 11.6487C6.39301 11.6487 6.6672 11.9069 6.6672 12.2902V17.4694C6.6672 17.8605 6.39301 18.1187 5.99785 18.1187Z" fill="#3A3A3A" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0018 18.1188C9.59853 18.1188 9.3324 17.8607 9.3324 17.4695V12.2903C9.3324 11.907 9.59853 11.6488 10.0018 11.6488C10.405 11.6488 10.6711 11.907 10.6711 12.2903V17.4695C10.6711 17.8607 10.405 18.1188 10.0018 18.1188Z" fill="#3A3A3A" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.0021 18.1187C13.607 18.1187 13.3328 17.8605 13.3328 17.4694V12.2902C13.3328 11.9069 13.607 11.6487 14.0021 11.6487C14.4053 11.6487 14.6715 11.9069 14.6715 12.2902V17.4694C14.6715 17.8605 14.4053 18.1187 14.0021 18.1187Z" fill="#3A3A3A" />
                                                        </svg>
                                                    </div>
                                                </>
                                            :   null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        {editable 
                            ?   <button className={classes.DropDownFilter__add} onClick={() => activateAddPopUp()}>
                                    Добавить
                                </button>
                            :   null
                        }
                    </div>
                </div>
    );
}

export default DropDownFilter;
