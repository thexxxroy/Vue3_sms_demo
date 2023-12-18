import type { RouteRecordRaw } from 'vue-router'

//加载本地路由
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  // console.log('加载本地路由', localRoutes)

  //1、读取router/main里所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // console.log(files);

  //2、将加载的对象放在localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

//映射菜单跳转路由
export function mapMenusToRoutes(userMenus: any[]) {
  //加载本地路由
  const localRoutes = loadLocalRoutes()
  // console.log('映射菜单跳转路由', localRoutes)

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
      if (route) routes.push(route)
    }
  }
  // console.log('根据菜单去匹配正确的路由', routes)

  return routes
}
