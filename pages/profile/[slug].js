import React from 'react'
import styles from "../../styles/Profile/Dr.module.css"
import Basic from '@/components/Profile/Basic'
import Info from '@/components/Profile/Info'
import BASE_URL from '@/config'
import axios from 'axios'

const Dr = ({ profile }) => {
    return (
        <div className={styles.wrapper}>
            <Basic profile={profile} />
            <div className={styles.heading}>
                <div className={styles.option}>
                    Info
                </div>
                <div className={styles.option}>
                    Experiance
                </div>
                <div className={styles.option}>
                    Reviews
                </div>
            </div>
            <Info profile={profile} />
        </div>
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