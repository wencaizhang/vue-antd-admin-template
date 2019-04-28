import { GET, POST, DELETE } from '@/utils/request';

// 安全组列表
export const getGroupList = payload => GET('/securitygroup/list', payload);

// 创建安全组
export const createGroup  = payload => POST('/securitygroup/create', payload);

// 编辑安全组
export const editGroup    = payload => POST('/securitygroup/edit', payload);

// 删除安全组
export const deleGroup    = payload => DELETE('/securitygroup/delete', payload);

// 规则列表
export const getRuleList  = payload => GET('/securitygroup/rule/list', payload);

// 添加规则
export const addRule      = payload => POST('/securitygroup/rule/add', payload);

// 删除安全组规则
export const deleRule     = payload => DELETE('/securitygroup/rule/delete', payload);
