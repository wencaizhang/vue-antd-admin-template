import { GET, POST, DELETE } from '@/utils/request';

// 公网IP列表
export const getIPList = payload => GET('/network/publicIP/list', payload);

// 分配公网IP
export const assignIP  = payload => POST('/network/publicIP/assign', payload);
 
// 绑定公网IP
export const bindIP    = payload => POST('/network/publicIP/bind', payload);
 
// 解绑IP
export const unbindIP  = payload => POST('/network/publicIP/unbind', payload);
 
// 释放IP
export const freeIP    = payload => POST('/network/publicIP/release', payload);