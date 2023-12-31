import type { RouteRecordRaw } from 'vue-router'

//加载本地路由
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  //1、读取router/main里所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })

  //2、将加载的对象放在localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

//映射菜单跳转路由
export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  //加载本地路由
  const localRoutes = loadLocalRoutes()

  //根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      //在 localRoutes 数组中查找第一个 path 属性与 subMenu.url 相匹配的元素。
      const route = localRoutes.find((item) => {
        // console.log('Checking route item:', item) // 打印每个检查的路由对象
        // console.log('Checking subMenu.url:', subMenu.url) // 打印每个检查的路由对象
        return item.path === subMenu.url
      })
      if (route) {
        //给route的顶层菜单增加重定向功能，仅添加一次
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        //将二级菜单加到路由
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = subMenu //记录第一个匹配到的菜单
    }
  }

  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path  需要匹配的路径
 * @param userMenus 所有菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      console.log('subMenu:', subMenu)

      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}

export function mapPathToBreakcrumbs(path: string, userMenus: any[]) {
  //定义面包屑
  const breakcrumbs: any[] = []

  //遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breakcrumbs.push({ name: menu.name, path: menu.url })
        breakcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breakcrumbs
}
