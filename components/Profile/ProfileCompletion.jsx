import { useMemo } from "react";
import styles from "../../styles/Profile/ProfileCompletion.module.css";

export default function ProfileCompletion({ user = {} }) {

    const percentage = useMemo(() => {
        const fields = [
            user.firstName,
            user.lastName,
            //   user.fullName,
            user.image,
            user.phoneNumber,
            user.speciality,
            user.education,
            user.workingIn,
            user.bmdcNumber,
            user.consultationFee,
            user.followUpFee,
            user.about,
            user.totalExperience,
        ];

        const completed = fields.filter(
            (v) => v !== undefined && v !== null && v !== ""
        ).length;

        const total = fields.length;

        return total === 0 ? 0 : Math.round((completed / total) * 100);
    }, [user]);

    return (
        <div className={styles.profile__completion}>
            <div className={styles.profile__completion__header}>
                <span>Profile Completion</span>
                <span>{percentage}%</span>
            </div>

            <div className={styles.profile__completion__progress}>
                <div
                    className={styles.profile__completion__progress_fill}
                    style={{ width: `${percentage}%`, background: `${percentage <= 50 ? "red" : ""}` }}
                />
            </div>
        </div>
    );
}