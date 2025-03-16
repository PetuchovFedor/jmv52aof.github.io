import React, { useState, useEffect } from 'react';
import Popup from '../../components/popup/Popup';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const PopupWrapper: React.FC<Props> = (
    props: Readonly<Props>,
) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (props.isOpen) {
            setIsActive(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsActive(false);
            document.body.style.overflow = 'unset';
      }
    }, [props.isOpen]);

    const handleClose = () => {
        setIsActive(false);
        setTimeout(() => {
            props.onClose();
        }, 500);
    };

    return (
        <div className={`${styles.popupWrapper__overlay} ${isActive ? styles.active : ''}`}>
            <div className={styles.popupWrapper__contentWrapper}>
                <div className={`${styles.popupWrapper__content} ${isActive ? styles.active : ''}`}>
                    <Popup onClose={handleClose} children={props.children}></Popup>
                </div>
            </div>
        </div>
    );
};

export default PopupWrapper;