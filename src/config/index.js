const LOCAL_STORAGE_KEY = {
  production: 'rhfactor_admin_token_prod',
  development: 'rhfactor_admin_token_dev',
  local: 'rhfactor_admin_token_local'
}

export const menus = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    menu: true
  },
  {
    name: 'Planetas',
    path: '/config/planet',
    menu: true
  },
  {
    name: 'Signos',
    path: '/config/sign',
    menu: true
  },
  {
    name: 'Casas',
    path: '/config/house',
    menu: true
  }, {
    name: 'Aspectos',
    path: '/config/aspect',
    menu: true
  }

]

export const tokenKey = LOCAL_STORAGE_KEY[process.env.NODE_ENV]

export const defaultPagination = { page: 0, size: 10, sort: null }
