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
// Order Craetion Form
const Create = ({ symptom: data }) => {
  const [symptom, setSymptom] = useState(data)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const [newSymptom, setNewSymptom] = useState(false)
  useEffect(() => {
    setSymptom(data)
  }, [router.query])
  const userInfo = useSelector(state => state.user.userInfo)
  const headers = { Authorization: `Bearer ${userInfo?.token}` }

  const saveSymptom = async () => {
    if (!symptom.name) {
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
        '/api/symptom',
        {
          ...symptom
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
      setSymptom({
        name: '',
        image: ''
      })
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'New Symptom Created ',
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
          message: 'Error While Creating Symptom !',
          option: {
            variant: 'error'
          }
        })
      )
    }
  }

  const updateSymptom = async () => {
    if (!symptom.name) {
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
        `/api/symptom/${router.query.id}`,
        {
          ...symptom
        },
        { headers }
      )
      // setSymptom(data)
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Symptom Updated',
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
          message: 'Error While Updating Symptom !',
          option: {
            variant: 'error'
          }
        })
      )
      setError('Error While Updating Symptom !')
    }
  }
  return (
    <div className={styles.wrapper}>
      <h2>{router.query.id ? 'Update' : 'Add'} Symptom</h2>
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Symptom Name</label>
            <input
              type='text'
              placeholder='Enter Symptom Name'
              value={symptom?.name}
              onChange={e => setSymptom({ ...symptom, name: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Symptom Icon</label>
            <Upload
              handle={files => {
                setSymptom(prev => ({ ...prev, image: files.url }))
              }}
            />
          </div>
          <div className={styles.images}>
            {symptom.image ? (
              <div className={styles.image__container}>
                <Image src={symptom.image} alt='' width='180' height={180} />
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
          <div
            className={styles.field}
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <span
              onClick={() =>
                setSymptom({ ...symptom, isFeatured: !symptom.isFeatured })
              }
            >
              {symptom.isFeatured ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </span>
            <span> This Symptom will be shown in home page</span>{' '}
          </div>
          <div
            className={styles.field}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          >
            {/* <span
              onClick={() =>
                setSymptom({ ...symptom, isShown: !symptom.isShown })
              }
            >
              {symptom.isShown ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
            </span>
            <span>
              {' '}
              This symptom name will be shown in product details page
            </span>{' '} */}
          </div>
        </div>
        {/* <div className={styles.right}></div> */}
      </form>
      {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
      <button
        onClick={() => (router.query.id ? updateSymptom() : saveSymptom())}
      >
        Save Symptom
      </button>
    </div>
  )
}

export default Create

export async function getServerSideProps({ query }) {
  const { id } = query

  const fetchSymptom = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/symptom/${id}`)
    return data
  }

  const fetchCategories = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/symptom`)
    return data.categories
  }

  // const categories = await fetchCategories()

  if (id) {
    const symptom = await fetchSymptom()
    return {
      props: {
        symptom
        // categories
      }
    }
  }

  return {
    props: {
      symptom: {
        name: '',
        image: '',
        children: []
      }
      // categories: categories
    }
  }
}
