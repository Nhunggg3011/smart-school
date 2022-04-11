import React from 'react'

export const RegisteredPages = [
  {
    type: 'un-auth', path: '/dang-nhap', component: React.lazy(() => import('./Auth/Login')), exact: true,
  },
  {
    type: 'un-auth', path: '/dang-ky', component: React.lazy(() => import('./Auth/Register')), exact: true,
  },
  {
    type: 'authenticated-onboard', path: '/cau-hinh', component: React.lazy(() => import('./Onboard/ZoomOnboard')), exact: true,
  },
  {
    type: 'authenticated', path: '/trang-chu', component: React.lazy(() => import('./Main/Dashboard')), exact: true,
  },
  {
    type: 'authenticated', path: '/cai-dat', component: React.lazy(() => import('./Main/Setting')), exact: true,
  },
  {
    type: 'authenticated', path: '/quan-ly-lop-hoc', component: React.lazy(() => import('./Main/ManageClass')), exact: true,
  },
  {
    type: 'authenticated', path: '/quan-ly-giao-vien', component: React.lazy(() => import('./Main/Teachers')), exact: true,
  },
  {
    type: 'authenticated', path: '/quan-ly-hoc-sinh', component: React.lazy(() => import('./Main/Students')), exact: true,
  },
  {
    type: 'authenticated', path: '/thoi-khoa-bieu', component: React.lazy(() => import('./Main/TimeTable')), exact: true,
  },
  {
    type: 'authenticated', path: '/ca-nhan', component: React.lazy(() => import('./Main/Profile')), exact: true,
  },
  {
    type: 'authenticated', path: '/them-tai-khoan', component: React.lazy(() => import('./Main/NewUser')), exact: true,
  },
  {
    type: 'authenticated', path: '/quan-ly-gio-hoc', component: React.lazy(() => import('./Main/Admin')), exact: true,
  },
  {
    type: 'authenticated', path: '/tiet-hoc', component: React.lazy(() => import('./Main/EventForm')), exact: true,
  },
  {
    type: 'authenticated', path: '/phong-hoc', component: React.lazy(() => import('./Main/LessonDetail')), exact: true,
  },
]
