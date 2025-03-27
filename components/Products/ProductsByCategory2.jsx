import React, { useEffect, useState } from 'react'
import styles from '@/styles/Products/ProductsByCategory2.module.css'
import Product from '../Product'
import ProgressBar from '../Utility/PBar'

const ProductsByCategory2 = ({
  category,
  subCategory,
  products: data,
  rowDirection,
  structure,
  title,
  description
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
        {products?.map((item, index) => (
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
