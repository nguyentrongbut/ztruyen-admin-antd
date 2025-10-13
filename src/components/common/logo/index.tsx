// ** Styles
import styles from '@/components/common/logo/logo.module.scss'

const size = 70

const Logo = () => {
    return (
        <div className={styles.wrapper}>
            <img src="/logo.png" alt="Logo Ztruyen | ztruyen.io.vn" width={size} height={size}/>
            <h1 className={styles.title}>Ztruyen</h1>
        </div>
    )
}

export default Logo