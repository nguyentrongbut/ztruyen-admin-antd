// ** React
import type {Dispatch, SetStateAction} from "react";

// ** antd
import {Flex, theme} from "antd";

// ** clsx
import clsx from "clsx";

// ** Style
import styles from "@/layouts/default-layout/components/collapsed-btn/collapsed.btn.module.scss";

// ** icons
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

interface ICollapsedBtnProps {
    collapsed: boolean
    setCollapsed: Dispatch<SetStateAction<boolean>>
    drawer?: boolean;
}

const CollapsedBtn = ({collapsed, setCollapsed, drawer = false}: ICollapsedBtnProps) => {

    const {
        token: {colorBgLayout, colorText},
    } = theme.useToken();

    const Icon = drawer
        ? LeftOutlined
        : collapsed
            ? RightOutlined
            : LeftOutlined;

    return (
        <Flex justify='center' align='center'
              className={clsx(styles.collapsedBtn, "cursor-pointer")}
              style={{
                  backgroundColor: colorBgLayout,
                  color: colorText,
              }}
              onClick={() => setCollapsed(!collapsed)}>
            <Icon className={styles.icon} />
        </Flex>
    )
}

export default CollapsedBtn