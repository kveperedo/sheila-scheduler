/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/root.route'
import { Route as employeesEmployeesrouteImport } from './routes/employees/employees.route'
import { Route as scheduleSchedulerouteImport } from './routes/schedule/schedule.route'

// Create/Update Routes

const employeesEmployeesrouteRoute = employeesEmployeesrouteImport.update({
  id: '/employees',
  path: '/employees',
  getParentRoute: () => rootRoute,
} as any)

const scheduleSchedulerouteRoute = scheduleSchedulerouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof scheduleSchedulerouteImport
      parentRoute: typeof rootRoute
    }
    '/employees': {
      id: '/employees'
      path: '/employees'
      fullPath: '/employees'
      preLoaderRoute: typeof employeesEmployeesrouteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof scheduleSchedulerouteRoute
  '/employees': typeof employeesEmployeesrouteRoute
}

export interface FileRoutesByTo {
  '/': typeof scheduleSchedulerouteRoute
  '/employees': typeof employeesEmployeesrouteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof scheduleSchedulerouteRoute
  '/employees': typeof employeesEmployeesrouteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/employees'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/employees'
  id: '__root__' | '/' | '/employees'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  scheduleSchedulerouteRoute: typeof scheduleSchedulerouteRoute
  employeesEmployeesrouteRoute: typeof employeesEmployeesrouteRoute
}

const rootRouteChildren: RootRouteChildren = {
  scheduleSchedulerouteRoute: scheduleSchedulerouteRoute,
  employeesEmployeesrouteRoute: employeesEmployeesrouteRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "root.route.tsx",
      "children": [
        "/",
        "/employees"
      ]
    },
    "/": {
      "filePath": "schedule/schedule.route.tsx"
    },
    "/employees": {
      "filePath": "employees/employees.route.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
