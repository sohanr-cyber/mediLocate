import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Shop/Experience.module.css'
import { useSelector } from 'react-redux'

const DISTANCE_OPTIONS = [
    { id: '2', label: 'Within 2 km', radius: 2 },
    { id: '5', label: 'Within 5 km', radius: 5 },
    { id: '10', label: 'Within 10 km', radius: 10 },
    { id: 'any', label: 'Any distance', radius: null },
]

const DistanceFilter = () => {
    const router = useRouter()
    const [selected, setSelected] = useState(router.query.radius || null)
    const userLocation = useSelector(state => state.user.location)

    const updateRoute = (data) => {
        const query = { ...router.query, ...userLocation }

        // clean null / undefined values
        Object.keys(data).forEach((key) => {
            if (data[key] === null || data[key] === undefined) {
                delete query[key]
            } else {
                query[key] = data[key]
            }
        })

        router.push(
            {
                pathname: router.pathname,
                query,

            },
            undefined,
            { shallow: false }
        )
    }

    const handleSelect = (option) => {
        // toggle off
        if (selected === option.id) {
            setSelected(null)
            updateRoute({ radius: null })
            return
        }

        setSelected(option.id)

        // Any distance → remove radius from query
        if (option.radius === null) {
            updateRoute({ radius: null })
        } else {
            updateRoute({ radius: option.radius })
        }
    }

    return (
        <div>
            {DISTANCE_OPTIONS.map((option) => (
                <div
                    key={option.id}
                    className={styles.flex}
                    onClick={() => handleSelect(option)}
                    style={{ cursor: 'pointer' }}
                >
                    {selected === option.id ? (
                        <CheckBox />
                    ) : (
                        <CheckBoxOutlineBlank />
                    )}
                    <div>{option.label}</div>
                </div>
            ))}
        </div>
    )
}

export default DistanceFilter
