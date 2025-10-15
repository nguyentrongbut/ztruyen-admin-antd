// ** Antd
import {Flex, Spin} from "antd";

// ** Styles
import styles from '@/components/common/loading/loading.module.scss'

const Loading = () => {
    return (
        <Flex align='center' justify='center' className={styles.loading}>
            <Spin size="large"/>
        </Flex>
    )
}

export default Loading