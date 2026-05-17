export const API_ENDPOINTS = {
  auth: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    verifyAccount: '/auth/verify-account',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    getProfile: '/auth/profile',
    logout: '/auth/logout',
  },
  admin: {
    getUsers: '/admin/users',
    toggleBanUser: (id: string) => `/admin/users/${id}`,
    deleteUser: (id: string) => `/admin/users/${id}`,

    getBrands: '/admin/brands',
    createBrand: '/admin/brands',
    updateBrand: (id: string) => `/admin/brands/${id}`,
    deleteBrand: (id: string) => `/admin/brands/${id}`,

    getCategories: '/admin/categories',
    createCategory: '/admin/categories',
    updateCategory: (id: string) => `/admin/categories/${id}`,
    deleteCategory: (id: string) => `/admin/categories/${id}`,

    getProductFilterOptions: '/admin/products/filters',
    getProducts: '/admin/products',
    createProduct: '/admin/products',
    updateProduct: (id: string) => `/admin/products/${id}`,
    toggleProductIsDeleted: (id: string) => `/admin/products/${id}`,

    getProductSkus: '/admin/products/skus',
    getProductSku: (id: string) => `/admin/products/skus/${id}`,
    createProductSku: (id: string) => `/admin/products/${id}/skus`,
    updateProductSku: (id: string) => `/admin/products/skus/${id}`,
    deleteProductSku: (id: string) => `/admin/products/skus/${id}`,
    deleteProductSkuImage: (id: string, imageId: string) =>
      `/admin/products/skus/${id}/images/${imageId}`,
  },
} as const
