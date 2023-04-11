const CONFIG_BASE ={
    htmlTitle:"Admin - {title}"   
}
// 开发环境
const  CONFIG_DEV  = {
    domain:'http://api'
}
// 生产环境
const CONFIG_PRO = {
    domain:'https://api'
}
// 测试环境
const CONFIG_TEST  = {
    domain:'http://api'
}
const CONFIG_MAP = {
    development:CONFIG_DEV,
    test:CONFIG_TEST,
    production:CONFIG_PRO
}
export default {...CONFIG_BASE,...CONFIG_MAP[process.env.NODE_ENV!]}//  process.env.NODE_ENV!  ts 中变量末尾带上！代表为非 null/undefined
