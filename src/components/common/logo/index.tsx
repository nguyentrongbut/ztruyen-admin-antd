// ** Styles
import styles from '@/components/common/logo/logo.module.scss'

// ** Antd
import {Flex, type FlexProps, Typography} from "antd";

interface ILogoProps extends FlexProps {
    size?: 'medium' | 'large'
}

const sizeAlignMap = {
    medium: 'center',
    large: 'end',
} as const;

const sizeLevelMap = {
    medium: 2,
    large: 1,
} as const;

const { Title } = Typography;

const Logo = ({size = 'medium', ...props}: ILogoProps) => {

    const alignItems = sizeAlignMap[size];
    const levelTitle = sizeLevelMap[size];

    return (
        <Flex align={alignItems} className={styles[size]} {...props}>
            <img src="/logo.png" alt="Logo Ztruyen | ztruyen.io.vn"/>
            <Title level={levelTitle} className={styles.title}>Ztruyen</Title>
        </Flex>
    )
}

export default Logo