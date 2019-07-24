import { GET, POST } from '@/utils/request';

// 创建工单
export const createOrder  = payload => POST('/workOrder/create', payload);

// 工单列表
export const getOrderList = payload => GET('/worker/review/userlist', payload);

// 修改工单
export const updateOrder = payload => POST('/workOrder/update', payload);

// 管理员审核用户认证信息
export const reviewUserAuth = payload => POST('/worker/reviewUserAuth', payload);
