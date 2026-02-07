import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Shop/Experience.module.css'

const EXPERIENCE_RANGES = [
    { id: '0-3', label: '0–3 years', min: 0, max: 3 },
    { id: '3-7', label: '3–7 years', min: 3, max: 7 },
    { id: '7-15', label: '7–15 years', min: 7, max: 15 },
    { id: '15+', label: '15+ years', min: 15, max: null },
]

const Experience = () => {
    const router = useRouter()
    const [selected, setSelected] = useState(
        router.query.minExperience
            ? `${router.query.minExperience}-${router.query.maxExperience || '+'}`
            : null
    )

    const updateRoute = (data) => {
        const query = { ...router.query }

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

    const handleSelect = (range) => {
        // toggle off
        if (selected === range.id) {
            setSelected(null)
            updateRoute({
                minExperience: null,
                maxExperience: null,
            })
            return
        }

        setSelected(range.id)

        updateRoute({
            minExperience: range.min,
            maxExperience: range.max,
        })
    }

    return (
        <div>
            {EXPERIENCE_RANGES.map((range) => (
                <div
                    key={range.id}
                    className={styles.flex}
                    onClick={() => handleSelect(range)}
                    style={{ cursor: 'pointer' }}
                >
                    {selected === range.id ? (
                        <CheckBox />
                    ) : (
                        <CheckBoxOutlineBlank />
                    )}
                    <div>{range.label}</div>
                </div>
            ))}
        </div>
    )
}

export default Experience
