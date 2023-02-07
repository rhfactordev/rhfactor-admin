const LOCAL_STORAGE_KEY = {
  production: 'rhfactor_admin_token_prod',
  development: 'rhfactor_admin_token_dev',
  local: 'rhfactor_admin_token_local'
}

export const menuLis = [
  {
    name: 'Login',
    path: '/login',
    roles: []
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    roles: ['ADMIN', 'CUSTOMER']
  },
  {
    name: 'Planetas',
    path: '/config/planet',
    roles: ['ADMIN']
  },
  {
    name: 'Signos',
    path: '/config/sign',
    roles: ['ADMIN']
  },
  {
    name: 'Casas',
    path: '/config/house',
    roles: ['ADMIN']
  }, {
    name: 'Aspectos',
    path: '/config/aspect',
    roles: ['ADMIN']
  }, {
    name: 'Transito',
    path: '/config/transit',
    roles: ['ADMIN']
  }, {
    name: 'Usuários Admin',
    path: '/config/admin-user',
    roles: ['ADMIN']
  }, {
    name: 'Customer',
    path: '/config/customer',
    roles: ['ADMIN']
  }, {
    name: 'Site',
    path: '/config/site',
    roles: ['ADMIN']
  }, {
    name: 'Domain',
    path: '/config/domain',
    roles: ['ADMIN']
  }, {
    name: 'Customer User',
    path: '/config/customer-user',
    roles: ['ADMIN']
  }, {
    name: 'Blog',
    path: '/config/blog',
    roles: ['CUSTOMER']
  }, {
    name: 'Post',
    path: '/config/post',
    roles: ['CUSTOMER']
  }, {
    name: 'Tag',
    path: '/config/tag',
    roles: ['CUSTOMER']
  }, {
    name: 'Categoria',
    path: '/config/blog-category',
    roles: ['CUSTOMER']
  }

]

export const tokenKey = LOCAL_STORAGE_KEY[process.env.NODE_ENV]

export const defaultPagination = { page: 0, size: 10, sort: null }
