import React, { useEffect, useState } from 'react'
import styles from "../../styles/Profile/Dr.module.css"
import Basic from '@/components/Profile/Basic'
import Info from '@/components/Profile/Info'
import BASE_URL from '@/config'
import axios from 'axios'
import RouteMap from '@/components/Utility/RouteMap'
import { useSelector } from 'react-redux'
import Appointment from '@/components/Profile/Appointment'
import Experiance from '@/components/Profile/Experiance'
import Reviews from '@/components/Profile/Reviews'
import FindNearMe from '@/components/Utility/FindNearMe'
import { useRouter } from 'next/router'

const Dr = ({ profile }) => {
    const headings = profile.role == "doctor" ? ["Info", "Experiance", "Reviews", "Appointments"] : ["Appointment"]

    const location = useSelector(state => state.user.location)
    const [isClient, setIsClient] = useState(false)
    const [selected, setSelected] = useState(headings[0])
    const userInfo = useSelector(state => state.user.userInfo)
    const headers = { Authorization: `Bearer ${userInfo?.token}` }
    const [myBooking, setMyBooking] = useState(null)
    const router = useRouter()

    const fetchMyBooking = async () => {
        const response = await axios.get(
            `${BASE_URL}/api/booking?userId=${profile._id || ''}`,
            {
                headers
            }
        )
        const { bookings, totalPages, page: currentPage } = response.data
        setMyBooking({ bookings, totalPages, page: currentPage })

    }

    useEffect(() => {
        setIsClient(true)
        fetchMyBooking()
    }, [])
    return (
        isClient &&
        <div className={styles.wrapper}>
            <Basic profile={profile} />
            {isClient && !(router.query.slug == userInfo?.id) && profile.role == "doctor" && location?.lat && profile.location && <RouteMap origin={{
                ...location
            }} destination={{
                lat: profile.location.coordinates[0],
                lng: profile.location.coordinates[1],
            }} />}
            <div className={styles.heading}>
                {headings.map((item, i) => (
                    < div className={styles.option} onClick={() => setSelected(item)} style={selected == item ? {
                        color: "white",
                        background: "black"
                    } : {}}>
                        {item == "Location" ? <FindNearMe text={"Locate"} />
                            : item}
                    </div>

                ))}

            </div>
            {
                selected == "Info" ? <Info profile={profile} /> :
                    selected == "Appointments"
                        ? <Appointment items={myBooking?.bookings} />
                        : selected == "Experiance"
                            ? <Experiance profile={profile} /> : selected == "Reviews" ? <Reviews /> :
                                <Info profie={profile} />
            }
        </div >
    )
}



// export async function getStaticPaths() {
//     // Fetch all available slugs for articles
//     const { data } = await axios.get(`${BASE_URL}/api/user/slugs`)

//     const paths = data.map(p => ({
//         params: { slug: p._id },
//     }))

//     return {
//         paths,
//         fallback: 'blocking' // Use blocking so new pages are generated on-demand
//     }
// }
// export async function getStaticProps({ params: { slug } }) {
//     try {
//         const start = Date.now()



//         const { data: profile } = await axios.get(`${BASE_URL}/api/user/${slug}`)


//         console.log(`Data fetching time: ${Date.now() - start}ms`)

//         return {
//             props: {
//                 profile
//             },
//             revalidate: 600 // Regenerate the page every 60 seconds
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error)
//         return {
//             props: {
//                 profile: {},
//                 error: error.message
//             }
//         }
//     }
// }
export async function getServerSideProps({ params: { slug } }) {
    try {
        const start = Date.now();

        const { data: profile } = await axios.get(`${BASE_URL}/api/user/${slug}`);

        console.log(`Data fetching time: ${Date.now() - start}ms`);

        return {
            props: {
                profile
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                profile: {},
                error: error.message
            }
        };
    }
}


export default Dr