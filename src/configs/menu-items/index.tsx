// ** i18n
import {useTranslation} from "react-i18next";

// ** antd
import type {MenuProps} from "antd";

// ** icons
import {
    BellOutlined,
    BookOutlined,
    CommentOutlined,
    DashboardOutlined, HeartOutlined, SettingOutlined,
    UserOutlined,
    WarningOutlined
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

const useMenuItems = (): MenuItem[] => {
    const { t } = useTranslation();

    return [
        {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: t("menu.dashboard"),
        },
        {
            key: "users",
            icon: <UserOutlined />,
            label: t("menu.users.title"),
            children: [
                { key: "/users", label: t("menu.users.list") },
                { key: "/users/trash", label: t("menu.users.trash") },
                { key: "/users/reports", label: t("menu.users.reports") },
            ],
        },
        {
            key: "stories",
            icon: <BookOutlined />,
            label: t("menu.stories.title"),
            children: [
                { key: "/stories", label: t("menu.stories.list") },
                { key: "/stories/pending", label: t("menu.stories.pending") },
                { key: "/genres", label: t("menu.stories.genres") },
                { key: "/stories/trash", label: t("menu.stories.trash") },
            ],
        },
        {
            key: "chapters",
            icon: <BookOutlined />,
            label: t("menu.chapters.title"),
            children: [
                { key: "/chapters", label: t("menu.chapters.list") },
                { key: "/chapters/hidden", label: t("menu.chapters.hidden") },
            ],
        },
        {
            key: "comments",
            icon: <CommentOutlined />,
            label: t("menu.comments.title"),
            children: [
                { key: "/comments", label: t("menu.comments.list") },
                { key: "/comments/reports", label: t("menu.comments.reports") },
            ],
        },
        {
            key: "reports",
            icon: <WarningOutlined />,
            label: t("menu.reports"),
        },
        {
            key: "notifications",
            icon: <BellOutlined />,
            label: t("menu.notifications"),
        },
        {
            key: "interactions",
            icon: <HeartOutlined />,
            label: t("menu.interactions.title"),
            children: [
                { key: "/follows", label: t("menu.interactions.follows") },
                { key: "/views", label: t("menu.interactions.views") },
            ],
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: t("menu.settings"),
        },
    ];
};


export default useMenuItems;