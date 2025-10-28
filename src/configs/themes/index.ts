const THEME_COMMON= {
    colorPrimary: '#33aaff',
    fontFamily:
        'Montserrat, "Montserrat Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
};

export const THEME_LIGHT_CONFIG = {
    GLOBAL: {
        ...THEME_COMMON,
        colorBgLayout: '#fefefe',
        colorBgElevated: '#ffffff',
        colorText: '#000000d9',
    },
    MENU: {
        itemColor: '#000000a6',
        itemSelectedBg: 'rgba(0,0,0,0.03)',
        itemHoverBg: 'rgba(0,0,0,0.03)',
    },
    BUTTON: {
        colorPrimary: '#33aaff',
        colorPrimaryHover: '#45a8f0',
        colorPrimaryActive: '#2489cf',
        colorTextLightSolid: '#fff',
    },
};

export const THEME_DARK_CONFIG = {
    GLOBAL: {
        ...THEME_COMMON,
        colorBgLayout: '#181818',
        colorBgElevated: '#1f1f1f',
        colorText: '#e5e7eb',
    },
    MENU: {
        itemColor: 'rgba(255,255,255,0.59)',
        itemSelectedColor: '#ffffff',
        subMenuItemSelectedColor: '#ffffff',
        itemSelectedBg: '#33aaff',
    },
    BUTTON: {
        colorPrimary: '#33aaff',
        colorPrimaryHover: '#45a8f0',
        colorPrimaryActive: '#2489cf',
        colorTextLightSolid: '#fff',
    },
};

