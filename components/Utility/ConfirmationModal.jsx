import React, { useState } from 'react'
import styles from '../../styles/Utility/ConfirmationModal.module.css'
const ConfirmationModal = ({ setOpenModal, bookNow }) => {
    const [note, setNote] = useState("")
    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <textarea type="text" placeholder='Add some notes ....(optional)' value={note} onChange={e => setNote(e.target.value)}></textarea>
                <p>Are You Really Want To Book Now ?</p>
                <div className={styles.flex}>
                    <div onClick={() => { bookNow({ note }) }}>Yes </div>
                    <div onClick={() => setOpenModal(false)} style={{ background: "red" }}>No</div>
                </div>
            </div>

        </div>
    )
}

export default ConfirmationModal
