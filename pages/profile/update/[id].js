import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import Upload from '@/components/Utility/Upload'
import axios from 'axios'
import BASE_URL from '@/config'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { showSnackBar } from '@/redux/notistackSlice'
import { buttonC, themeBg } from '@/utility/const'
import { parse } from 'cookie'
import MapPicker from '@/components/Utility/MapPicker'

// Order Craetion Form
const Update = ({ profile: data }) => {
    const [profile, setProfile] = useState(data)
    const [error, setError] = useState('')
    const [isClient, setIsClient] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [selectedLocation, setSelectedLocation] = useState({
        lat: data.location?.coordinates && data.location?.coordinates[0],
        lng: data.location?.coordinates && data.location?.coordinates[1]
    })
    const [newProfile, setNewProfile] = useState(false)
    useEffect(() => {
        setIsClient(true)
        setProfile(data)
    }, [router.query])
    const userInfo = useSelector(state => state.user.userInfo)
    const headers = { Authorization: `Bearer ${userInfo?.token}` }

    const saveProfile = async () => {
        if (!profile.name) {
            dispatch(
                showSnackBar({
                    message: 'Please fill all the necessaary field',
                    option: {
                        variant: 'error'
                    }
                })
            )
            return
        }
        try {
            dispatch(startLoading())
            const { data } = await axios.post(
                '/api/profile',
                {
                    ...profile
                },
                {
                    headers
                }
            )
            if (data.error) {
                dispatch(
                    showSnackBar({
                        message: data.error,
                        option: {
                            variant: 'error'
                        }
                    })
                )
                dispatch(finishLoading())
                return
            }
            setProfile({
                name: '',
                image: ''
            })
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'New Profile Created ',
                    option: {
                        variant: 'success'
                    }
                })
            )
        } catch (error) {
            console.log(error)
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'Error While Creating Profile !',
                    option: {
                        variant: 'error'
                    }
                })
            )
        }
    }

    const updateProfile = async () => {
        if (!profile.firstName || !profile.lastName) {
            setError('Pleas fill all the necessaary field')
            dispatch(
                showSnackBar({
                    message: 'Please fill all the necessaary field',
                    option: {
                        variant: 'error'
                    }
                })
            )
            return
        }
        try {
            dispatch(startLoading())
            const { data } = await axios.put(
                `/api/user/${router.query.id}`,
                {
                    ...profile, location:
                        { coordinates: [selectedLocation?.lat, selectedLocation?.lng] }

                },
                { headers }
            )
            setProfile(data)
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'Profile Updated',
                    option: {
                        variant: 'default'
                    }
                })
            )
        } catch (error) {
            console.log(error)
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'Error While Updating Profile !',
                    option: {
                        variant: 'error'
                    }
                })
            )
            setError('Error While Updating Profile !')
        }
    }
    return (
        <div className={styles.wrapper}>
            <h2>{router.query.id ? 'Update' : 'Add'} Profile</h2>
            <form className={styles.forms}>
                <div className={styles.left}>
                    <div className={styles.field}>
                        <label>First Name</label>
                        <input
                            type="text"
                            placeholder="Enter Profile Name"
                            value={profile?.firstName}
                            onChange={e => setProfile({ ...profile, firstName: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Last Name</label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            value={profile?.lastName}
                            onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            value={profile?.fullName}
                            onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter Phone Number"
                            value={profile?.phone}
                            onChange={e => setProfile({ ...profile, phone: e.target.value })}
                        />
                    </div>
                    {profile.role == "doctor" && (<>     <div className={styles.field}>
                        <label>Education Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Education/Degrees"
                            value={profile?.education}
                            onChange={e => setProfile({ ...profile, education: e.target.value })}
                        />
                    </div>

                        <div className={styles.field}>
                            <label>Speciality</label>
                            <input
                                type="text"
                                placeholder="Enter Your Speciality"
                                value={profile?.speciality}
                                onChange={e => setProfile({ ...profile, speciality: e.target.value })}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Total Experience (Years)</label>
                            <input
                                type="number"
                                placeholder="Enter Total Experience"
                                value={profile?.totalExperience}
                                onChange={e => setProfile({ ...profile, totalExperience: e.target.value })}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>BMDC Number</label>
                            <input
                                type="text"
                                placeholder="Enter BMDC Number"
                                value={profile?.bmdcNumber}
                                onChange={e => setProfile({ ...profile, bmdcNumber: e.target.value })}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Working Institution</label>
                            <input
                                type="text"
                                placeholder="Enter Current Workplace"
                                value={profile?.workingIn}
                                onChange={e => setProfile({ ...profile, workingIn: e.target.value })}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Consultation Fee (BDT)</label>
                            <input
                                type="number"
                                placeholder="Enter Consultation Fee"
                                value={profile?.consultationFee}
                                onChange={e => setProfile({ ...profile, consultationFee: e.target.value })}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Average Consultation Time (Minutes)</label>
                            <input
                                type="number"
                                placeholder="Enter Avg Consultation Time"
                                value={profile?.avgConsultationTimes}
                                onChange={e => setProfile({ ...profile, avgConsultationTimes: e.target.value })}
                            />
                        </div>

                    </>)}

                    <div className={styles.field}>
                        <label>Profile Icon</label>
                        <Upload
                            handle={files => {
                                setProfile(prev => ({ ...prev, image: files.url }))
                            }}
                        />
                    </div>
                    <div className={styles.images}>
                        {profile?.image ? (
                            <div className={styles.image__container}>
                                <Image src={profile.image} alt='' width='180' height={180} />
                            </div>
                        ) : (
                            <div
                                className={styles.image__container}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                No Photo Uploaded
                            </div>
                        )}
                    </div>
                    <div className={styles.field}>
                        <label>Your Location ({selectedLocation?.lat} , {selectedLocation?.lng})</label>
                        {isClient && <MapPicker selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />}
                    </div>

                </div>
                {/* <div className={styles.right}></div> */}
            </form>
            {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
            <button
                onClick={() => (router.query.id ? updateProfile() : saveProfile())}
            >
                Save Profile
            </button>
        </div>
    )
}

export default Update

export async function getServerSideProps(context) {

    const { id } = context.query
    const { locale, req } = context
    const cookies = parse(req.headers.cookie || '')

    const userInfo = cookies['userInfo']
        ? JSON.parse(cookies['userInfo'])
        : null

    if (!userInfo || !userInfo.token) {
        throw new Error('User is not authenticated')
    }

    const headers = { Authorization: `Bearer ${userInfo.token}` }

    const fetchProfile = async () => {
        const { data } = await axios.get(`${BASE_URL}/api/user/${id}`, {
            headers
        })
        return data
    }


    // const categories = await fetchCategories()

    if (id) {
        const profile = await fetchProfile()
        return {
            props: {
                profile
                // categories
            }
        }
    }

    return {
        props: {
            profile: {
                name: '',
                image: '',
                children: []
            }
            // categories: categories
        }
    }
}
