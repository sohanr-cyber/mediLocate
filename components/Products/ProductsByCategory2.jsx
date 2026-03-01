import React, { useEffect, useState } from 'react'
import styles from '@/styles/Products/ProductsByCategory2.module.css'
import Product from '../Product'
import ProgressBar from '../Utility/PBar'
import SkeletonDiv from '../Utility/SkeletonDiv'
import { Height } from '@mui/icons-material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'

const ProductsByCategory2 = ({
  category,
  subCategory,
  products: data,
  rowDirection,
  structure,
  title,
  description,
  incoming = false,
  seeMore
}) => {
  const [products, setProducts] = useState(data)
  const style = `styles.${structure}`
  const router = useRouter()
  useEffect(() => {
    setProducts(data)
  }, [data])

  const findMore = () => {
    router.push("/dr")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top} >
        <h2>
          {title}
        </h2>
        <p>{description}</p>
      </div>
      <div className={styles.topMobile}>
        <div className={styles.title}>
        <h3>  Available Doctor</h3>
        </div>
        <div className={styles.seeMoreMobile} onClick={() => findMore()}>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
          }}>See More <ArrowForwardIcon /></button>
        </div>
      </div>
      <div className={`${styles.products} ${style}`}>
        {incoming ? [1, 2, 3, 4, 5, 6].map(s => <SkeletonDiv style={{ width: "160px", height: "220px", minWidth: "150px" }} />)
          : products?.map((item, index) => (
            <Product
              key={index}
              item={item}
              redirect={true}
              structure={structure}
              rowDirection={true}
            />
          ))}
      </div>
      {seeMore && <div className={styles.seeMore}>
        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "15px"
        }} onClick={() => findMore()}>See More <ArrowForwardIcon /></button>
      </div>}
    </div>
  )
}

export default ProductsByCategory2
