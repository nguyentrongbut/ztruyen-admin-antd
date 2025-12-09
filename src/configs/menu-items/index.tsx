// ** React
import { Link } from "react-router";

// ** i18n
import { useTranslation } from "react-i18next";

// ** antd
import type { MenuProps } from "antd";

// ** icons
import {
    BellOutlined,
    BookOutlined,
    CommentOutlined,
    DashboardOutlined,
    HeartOutlined,
    SettingOutlined, TagsOutlined,
    UserOutlined,
    WarningOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const useMenuItems = (): MenuItem[] => {
    const { t } = useTranslation();

    return [
        {
            key: "/",
            icon: <DashboardOutlined />,
            label: <Link to="/">{t("menu.dashboard")}</Link>,
        },
        {
            key: "users",
            icon: <UserOutlined />,
            label: t("menu.users.title"),
            children: [
                { key: "/users", label: <Link to="/users">{t("menu.users.list")}</Link> },
                { key: "/users/trash", label: <Link to="/users/trash">{t("menu.users.trash")}</Link> }
            ],
        },
        {
            key: "genres",
            icon: <TagsOutlined />,
            label: t("menu.genres.title"),
            children: [
                { key: "/genres", label: <Link to="/genres">{t("menu.genres.list")}</Link> },
                { key: "/genres/trash", label: <Link to="/genres/trash">{t("menu.genres.trash")}</Link> }
            ],
        },
        {
            key: "stories",
            icon: <BookOutlined />,
            label: t("menu.stories.title"),
            children: [
                { key: "/stories", label: <Link to="/stories">{t("menu.stories.list")}</Link> },
                { key: "/stories/pending", label: <Link to="/stories/pending">{t("menu.stories.pending")}</Link> },
                { key: "/stories/trash", label: <Link to="/stories/trash">{t("menu.stories.trash")}</Link> },
            ],
        },
        {
            key: "chapters",
            icon: <BookOutlined />,
            label: t("menu.chapters.title"),
            children: [
                { key: "/chapters", label: <Link to="/chapters">{t("menu.chapters.list")}</Link> },
                { key: "/chapters/hidden", label: <Link to="/chapters/hidden">{t("menu.chapters.hidden")}</Link> },
            ],
        },
        {
            key: "comments",
            icon: <CommentOutlined />,
            label: t("menu.comments.title"),
            children: [
                { key: "/comments", label: <Link to="/comments">{t("menu.comments.list")}</Link> },
                { key: "/comments/reports", label: <Link to="/comments/reports">{t("menu.comments.reports")}</Link> },
            ],
        },
        {
            key: "/reports",
            icon: <WarningOutlined />,
            label: <Link to="/reports">{t("menu.reports")}</Link>,
        },
        {
            key: "/notifications",
            icon: <BellOutlined />,
            label: <Link to="/notifications">{t("menu.notifications")}</Link>,
        },
        {
            key: "interactions",
            icon: <HeartOutlined />,
            label: t("menu.interactions.title"),
            children: [
                { key: "/follows", label: <Link to="/follows">{t("menu.interactions.follows")}</Link> },
                { key: "/views", label: <Link to="/views">{t("menu.interactions.views")}</Link> },
            ],
        },
        {
            key: "/settings",
            icon: <SettingOutlined />,
            label: <Link to="/settings">{t("menu.settings")}</Link>,
        },
    ];
};

export default useMenuItems;
