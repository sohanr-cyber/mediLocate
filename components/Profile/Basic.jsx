import React from 'react'
import styles from '../../styles/Profile/Basic.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CreateIcon from '@mui/icons-material/Create';
import { useSelector } from 'react-redux';
const Basic = ({ profile }) => {
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.pic}>
                    <Image src={profile.image} width={200} height={260} alt="" onClick={() => router.push(`/profile/update/${router.query.slug}`)} />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.name}>{
                    profile.firstName}{" "}{profile.lastName}
                    {router.query.slug == userInfo?.id && <CreateIcon className={styles.icon} onClick={() => router.push(`/profile/update/${router.query.slug}`)} />
                    }
                </div>

                <div className={styles.education}>
                    {profile.speciality}
                </div>
                {profile.department && <div className={styles.department}>
                    Dermatologist
                </div>}

                <div className={styles.flex}>
                    <div className={styles.item}>
                        <div>Total Experiance</div>
                        <b>{profile.totalExperience} Years</b>
                    </div>
                    <div className={styles.item}>
                        <div>BMDC Number
                        </div>
                        <b>
                            {profile.bmdcNumber}
                        </b>
                    </div>
                    <div className={styles.item}>
                        <div>Total Rating</div>
                        <b>0.0
                            (000)</b>
                    </div>
                    <div className={styles.item}>
                        <div>Working In</div>
                        <b>
                            {profile.workingIn || "..............."}
                        </b>
                    </div>
                </div>
                <div className={styles.book}>
                    <div className={styles.left}>
                        <div>Consulation Fee</div>
                        <div className={styles.fee}>
                            BDT {profile.consultationFee || 500}
                        </div>
                    </div>
                    <div className={styles.btn}>
                        Book Now
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Basic