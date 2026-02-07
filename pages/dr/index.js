import React, { useState } from 'react'
import styles from '../../styles/Shop/Shop.module.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import GridViewIcon from '@mui/icons-material/GridView'
import Product from '@/components/Product'
import axios from 'axios'
import BASE_URL from '@/config'
import { TurnRightSharp } from '@mui/icons-material'
import Filter from '@/components/Shop/Filter'
import Pagination from '@/components/Utility/Pagination'
import { useRouter } from 'next/router'

const sortOptions = [
  {
    value: 'Best Match',
    query: {
      sortBy: '',
      sortOrder: ''
    }
  },
  {
    value: 'Fee Low To High',
    query: {
      sortBy: 'fee',
      sortOrder: 'asc'
    }
  },
  {
    value: 'Fee Hight To Low',
    query: {
      sortBy: 'fee',
      sortOrder: 'desc'
    }
  },
  {
    value: 'Newest To Oldest',
    query: {
      sortBy: 'date',
      sortOrder: 'desc'
    }
  },
  {
    value: 'Oldest To Newest',
    query: {
      sortBy: 'date',
      sortOrder: 'asc'
    }
  }
]
const Home = ({ users, totalPages, currentPage, count }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const updateRoute = data => {
    console.log({ data })
    const queryParams = { ...router.query, ...data }

    router.push({
      pathname: router.pathname,
      query: queryParams,
      shallow: false
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.filter} onClick={() => setOpen(true)}>
            <FilterAltIcon />
            Filter
          </div>
          <div>{count} items found </div>
        </div>
        <div className={styles.right}>
          <select
            onChange={e => {
              updateRoute(
                sortOptions.find(item => item.value == e.target.value).query
              )
            }}
          >
            {[...sortOptions].map((i, index) => (
              <option key={index} value={i.value}>
                {i.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.products}>
        {[...users].map((item, index) => (
          <Product key={index} item={item} redirect={true} />
        ))}
      </div>
      <div className={styles.flex}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
      {open && (
        <div className={styles.filterOptions}>
          <Filter setOpen={setOpen} />
        </div>
      )}
    </div>
  )
}

export default Home


export async function getServerSideProps(context) {
    const {
        page = 1,
        sortBy,
        sortOrder,

        // distance
        lat,
        lng,
        radius,

        // experience
        minExperience,
        maxExperience,

        // fee
        minFee,
        maxFee,
    } = context.query

    try {
        const params = {
            page,
            sortBy,
            sortOrder,

            lat,
            lng,
            radius,

            minExperience,
            maxExperience,

            minFee,
            maxFee,
        }

        // remove empty params
        Object.keys(params).forEach(
            (key) =>
                (params[key] === undefined ||
                    params[key] === null ||
                    params[key] === '') &&
                delete params[key]
        )

        const response = await axios.get(
            `${BASE_URL}/api/user/filter`,
            { params }
        )

        const {
            users,
            totalPages,
            page: currentPage,
            count,
        } = response.data

        return {
            props: {
                title: 'User List',
                users,
                totalPages,
                currentPage,
                count,
            },
        }
    } catch (error) {
        console.error('Error fetching users:', error)

        return {
            props: {
                title: 'User List',
                users: [],
                totalPages: 0,
                currentPage: 1,
                count: 0,
            },
        }
    }
}

