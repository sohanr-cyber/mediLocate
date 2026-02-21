import React, { useEffect, useState } from 'react'
import styles from '@/styles/Products/ProductsByCategory2.module.css'
import Product from '../Product'
import ProgressBar from '../Utility/PBar'
import SkeletonDiv from '../Utility/SkeletonDiv'
import { Height } from '@mui/icons-material'

const ProductsByCategory2 = ({
  category,
  subCategory,
  products: data,
  rowDirection,
  structure,
  title,
  description,
  incoming = false
}) => {
  const [products, setProducts] = useState(data)
  const style = `styles.${structure}`

  useEffect(() => {
    setProducts(data)
  }, [data])

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h2>
          {title}
        </h2>
        <p>{description}</p>
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
    </div>
  )
}

export default ProductsByCategory2
