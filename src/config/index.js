import * as Yup from 'yup'

const LOCAL_STORAGE_KEY = {
  production: 'rhfactor_admin_token_prod',
  development: 'rhfactor_admin_token_dev',
  local: 'rhfactor_admin_token_local'
}

const nameSlug = [
  {
    label: 'Nome',
    name: 'name',
    as: 'input',
    rules: Yup.string().required()
  },
  {
    label: 'Slug',
    name: 'source',
    as: 'input',
    rules: Yup.string().required()
  }
]

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
    roles: ['ADMIN'],
    route: true,
    resource: 'planet',
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  },
  {
    name: 'Signos',
    path: '/config/sign',
    resource: 'sign',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  },
  {
    name: 'Casas',
    path: '/config/house',
    resource: 'house',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  },
  {
    name: 'Aspectos',
    path: '/config/aspect',
    resource: 'aspect',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  }, {
    name: 'Transito',
    path: '/config/transit',
    resource: 'transit',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  },
  {
    name: 'Usuários Admin',
    path: '/config/admin-user',
    resource: 'admin-user',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  },
  {
    name: 'Customer',
    path: '/config/customer',
    resource: 'house',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  },
  {
    name: 'Site',
    path: '/config/site',
    resource: 'site',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: {
        label: 'Nome',
        name: 'name',
        as: 'input',
        rules: Yup.string().required()
      }
    },
    meta: {
      hasAuth: true
    }
  }, {
    name: 'Domain',
    path: '/config/domain',
    resource: 'house',
    roles: ['ADMIN'],
    route: true,
    schema: {
      fields: nameSlug
    },
    meta: {
      hasAuth: true
    }
  }

]

export const tokenKey = LOCAL_STORAGE_KEY[process.env.NODE_ENV]

export const defaultPagination = { page: 0, size: 10, sort: null }
