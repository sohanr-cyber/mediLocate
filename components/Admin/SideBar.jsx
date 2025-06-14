import React, { useState } from 'react'
import styles from '../../styles/Admin/SideBar.module.css'
import Image from 'next/image'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import MapIcon from '@mui/icons-material/Map'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LogoutIcon from '@mui/icons-material/Logout'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Logo from '../Utility/Logo'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import CommentIcon from '@mui/icons-material/Comment'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CameraIcon from '@mui/icons-material/Camera'
import Logout from '../Utility/Logout'

const SideBar = ({ setOpen }) => {
  const router = useRouter()
  const [visible, setVisible] = useState('')
  const logout = () => {
    // Cookies.remove('userInfo')
    router.reload()
    router.push('/login')
  }

  return (
    <div className={styles.wrapper}>
      {' '}
      <div className={styles.left}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <Logo color={'aliceblue'} />
          </div>
          <div className={styles.exit} onClick={() => setOpen(setOpen(false))}>
            <ExitToAppIcon />
          </div>
        </div>
        <div className={styles.navigators}>
          {' '}
          <div className={styles.item} onClick={() => router.push('/admin')}>
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <DashboardIcon />
              </div>
              <div className={styles.title}>Dashboard</div>
            </div>
          </div>
          <div
            className={styles.item}
            onClick={() =>
              setVisible(prev => (prev == 'content' ? '' : 'content'))
            }
          >
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <CameraIcon />
              </div>
              <div className={styles.title}>Content</div>{' '}
            </div>
            <div className={styles.icon}>
              {visible == 'content' ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{' '}
            </div>
          </div>{' '}
          {visible == 'content' && (
            <div className={styles.inner__items}>
              <div
                className={styles.item}
                onClick={() => router.push('/admin/content')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <FormatListBulletedIcon />
                  </div>
                  <div className={styles.title}>Content List</div>
                </div>
              </div>{' '}
              <div
                className={styles.item}
                onClick={() => router.push('/admin/content/create')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <AddCircleIcon />
                  </div>
                  <div className={styles.title}>Add Content</div>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.item}
            onClick={() =>
              setVisible(prev => (prev == 'product' ? '' : 'product'))
            }
          >
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <ShoppingCartIcon />
              </div>
              <div className={styles.title}>Product</div>
            </div>
            <div className={styles.icon}>
              {visible == 'product' ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>
          </div>
          {visible == 'product' && (
            <div className={styles.inner__items}>
              <div
                className={styles.item}
                onClick={() => router.push('/admin/product')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <FormatListBulletedIcon />
                  </div>
                  <div className={styles.title}>Product List</div>
                </div>
              </div>{' '}
              <div
                className={styles.item}
                onClick={() => router.push('/admin/product/create')}
              >
                <div className={styles.flex}>
                  <div className={styles.icon}>
                    <AddCircleIcon />
                  </div>
                  <div className={styles.title}>Add Product</div>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.item}
            onClick={() =>
              setVisible(prev => (prev == 'department' ? '' : 'department'))
            }
          >
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <CategoryIcon />
              </div>
              <div className={styles.title}>Department</div>{' '}
            </div>
            <div className={styles.icon}>
              {visible == 'department' ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{' '}
            </div>
          </div>{' '}
          {visible == 'department' && (
            <div className={styles.inner__items}>
              <div
                className={styles.item}
                onClick={() => router.push('/admin/department')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <FormatListBulletedIcon />
                  </div>
                  <div className={styles.title}>Department List</div>
                </div>
              </div>{' '}
              <div
                className={styles.item}
                onClick={() => router.push('/admin/department/create')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <AddCircleIcon />
                  </div>
                  <div className={styles.title}>Add Department</div>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.item}
            onClick={() =>
              setVisible(prev => (prev == 'symptom' ? '' : 'symptom'))
            }
          >
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <CategoryIcon />
              </div>
              <div className={styles.title}>Symptom</div>{' '}
            </div>
            <div className={styles.icon}>
              {visible == 'symptom' ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{' '}
            </div>
          </div>{' '}
          {visible == 'symptom' && (
            <div className={styles.inner__items}>
              <div
                className={styles.item}
                onClick={() => router.push('/admin/symptom')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <FormatListBulletedIcon />
                  </div>
                  <div className={styles.title}>Symptom List</div>
                </div>
              </div>{' '}
              <div
                className={styles.item}
                onClick={() => router.push('/admin/symptom/create')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <AddCircleIcon />
                  </div>
                  <div className={styles.title}>Add Symptom</div>
                </div>
              </div>
            </div>
          )}
          <div

            className={styles.item}
            onClick={() => setVisible(prev => (prev == 'order' ? '' : 'order'))}
          >
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <AssignmentTurnedInIcon />
              </div>
              <div className={styles.title}>Orders</div>
            </div>
            <div className={styles.icon}>
              {visible == 'order' ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{' '}
            </div>
          </div>
          {visible == 'order' && (
            <div className={styles.inner__items}>
              <div
                className={styles.item}
                onClick={() => router.push('/admin/order')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <FormatListBulletedIcon />
                  </div>
                  <div className={styles.title}>Order List</div>
                </div>
              </div>
              <div className={styles.item} style={{ display: 'none' }}>
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <AddCircleIcon />
                  </div>
                  <div className={styles.title}>Add Order</div>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.item}
            onClick={() =>
              setVisible(prev => (prev == 'coupon' ? '' : 'coupon'))
            }
          // style={{ display: 'none' }}
          >
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <AssignmentTurnedInIcon />
              </div>
              <div className={styles.title}>Coupon</div>
            </div>
            <div className={styles.icon}>
              {visible == 'coupon' ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{' '}
            </div>
          </div>
          {visible == 'coupon' && (
            <div className={styles.inner__items}>
              <div
                className={styles.item}
                onClick={() => router.push('/admin/coupon')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <FormatListBulletedIcon />
                  </div>
                  <div className={styles.title}>Coupon List</div>
                </div>
              </div>
              <div
                className={styles.item}
                onClick={() => router.push('/admin/coupon/create')}
              >
                <div className={styles.flex}>
                  {' '}
                  <div className={styles.icon}>
                    <AddCircleIcon />
                  </div>
                  <div className={styles.title}>Add Coupon</div>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.item}
            onClick={() => router.push('/admin/user')}
          >
            <div className={styles.flex}>
              {' '}
              <div className={styles.icon}>
                <MapIcon />
              </div>
              <div className={styles.title}>User</div>
            </div>
          </div>
          <div className={styles.item}>
            <Logout />
          </div>
        </div>
      </div>
      <div className={styles.right} onClick={() => setOpen(false)}></div>
    </div>
  )
}

export default SideBar
