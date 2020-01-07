// import { asyncRoutes } from '../router'

// // 将菜单信息转成对应的路由信息 动态添加
// export function menusToRoutes(data) {
//     const result = []
//     const children = []

//     result.push({
//         path: '/',
//         component: () => import('../components/Index.vue'),
//         children,
//     })

//     data.forEach(item => {
//         generateRoutes(children, item)
//     })

//     children.push({
//         path: 'error',
//         name: 'error',
//         component: () => import('../components/public/Error.vue')
//     })

//     // 最后添加404页面 否则会在登陆成功后跳到404页面
//     result.push(
//         {path: '*', redirect: '/error'},
//     )

//     return result
// }
// //生成路由
// function generateRoutes(children, item) {
//     if (item.name) {
//         children.push(asyncRoutes[item.name])
//     } else if (item.children) {
//         item.children.forEach(e => {
//             generateRoutes(children, e)
//         })
//     }
// }
