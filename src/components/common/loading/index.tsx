// ** Antd
import {Spin} from "antd";

// ** Styles
import styles from '@/components/common/loading/loading.module.scss'

const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <Spin size="large" />
        </div>
    )
}

export default Loading