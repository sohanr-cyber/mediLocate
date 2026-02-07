import React from 'react'
import styles from '../../styles/Utility/ConfirmationModal.module.css'
const ConfirmationModal = ({ setOpenModal, bookNow }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <p>Are You Really Want To Book Now ?</p>
                <div className={styles.flex}>
                    <div onClick = {() => {bookNow()}}>Yes </div>
                    <div onClick={() => setOpenModal(false)} style={{ background: "red" }}>No</div>
                </div>
            </div>

        </div>
    )
}

export default ConfirmationModal
