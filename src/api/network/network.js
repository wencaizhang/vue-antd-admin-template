import { GET, POST, DELETE } from '@/utils/request';

// 网络列表
export const getNetworkList = payload => GET('/network/list', payload);

// 子网列表
export const getSubNetList  = payload => GET('/network/subnet/list', payload);
 
// 创建网络
export const createNetwork  = payload => POST('/network/create', payload);
 
// 编辑网络
export const editNetwork    = payload => POST('/network/edit', payload);
 
// 删除网络
export const deleteNetwork  = payload => DELETE('/network/delete', payload);
