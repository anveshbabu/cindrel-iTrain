export const EXIST_LOCAL_STORAGE ={
    AUTHTOKEN:'AuthToken',
    REFRESH_TOKEN:'refreshToken',
    USER_DETAIL:'userDetail',
    USER_ID:'userId',
    IS_KEEP_ME:'isKeepMe',
    THEME_MODE:'themeMode',
    MODULE_DETAIL:'moduleDetail',

}


export const CONFIG ={
    API_URL: process.env.NODE_ENV === 'development' ?process.env.REACT_APP_DEV_URL:process.env.REACT_APP_PROD_URL,
}

export const ALL_BG_PLACEHOLDERS =['bg-primary','bg-secondary','bg-success','bg-danger','bg-warning','bg-info',' bg-light','bg-dark']

