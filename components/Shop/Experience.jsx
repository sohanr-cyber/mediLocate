import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import React, { useState } from 'react'
import styles from '../../styles/Shop/Experience.module.css'
const EXPERIENCE_RANGES = [
    { id: "0-3", label: "0–3 years", min: 0, max: 3 },
    { id: "3-7", label: "3–7 years", min: 3, max: 7 },
    { id: "7-15", label: "7–15 years", min: 7, max: 15 },
    { id: "15+", label: "15+ years", min: 15, max: Infinity },
];
const Experience = () => {
    const [selected, setSelected] = useState([]);

    const handleToggle = (range) => {
        let updated = [];
        if (selected.includes(range.id)) {
            // remove
            updated = selected.filter((id) => id !== range.id);
        } else {
            // add
            updated = [...selected, range.id];
        }
        setSelected(updated);

        // send full range objects to parent
        const selectedRanges = EXPERIENCE_RANGES.filter((r) =>
            updated.includes(r.id)
        );
        onChange?.(selectedRanges);
    };
    return (
        <div>

            {EXPERIENCE_RANGES.map((range) => (
                <div className={styles.flex}>
                    <CheckBoxOutlineBlank />
                    <div>
                        {range.label}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Experience
