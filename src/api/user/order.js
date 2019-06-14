import { GET, POST } from '@/utils/request';

// 创建工单
export const createOrder  = payload => POST('/workOrder/create', payload);
// 工单列表
export const getOrderList = payload => GET('/workOrder/list', payload);
// 修改工单
export const updateOrder = payload => POST('/workOrder/update', payload);
