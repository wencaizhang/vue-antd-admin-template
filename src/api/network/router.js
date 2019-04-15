import { GET, POST, DELETE } from '@/utils/request';

// 路由器列表
export const getRouterList = payload => GET('/network/router/list', payload);
 
// 创建路由器
export const createRouter  = payload => POST('/network/router/create', payload);
 
// 删除路由器
export const deleteRouter  = payload => DELETE('/network/router/delete', payload);
 
// 编辑路由器
export const editRouter    = payload => POST('/network/router/edit', payload);
 
// 设置网关 / 清除网关
export const setGateway    = payload => POST('/network/router/gateway', payload);

// 关联子网到路由
export const attach        = payload => POST('/network/router/attach', payload);

// 删除路由网络接口
export const detach        = payload => POST('/network/router/detach', payload);

