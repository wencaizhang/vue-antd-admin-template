
import { GET, POST } from '@/utils/request';

// 用户登录
export const userLogin   = payload => POST('/user/login', payload);

// 用户创建
export const createUser  = payload => POST('/user/create', payload);

// 修改密码
export const modifyPwd   = payload => POST('/user/modifyPwd', payload);

// 用户基本信息
export const getBaseInfo = payload => GET('/user/base', payload);

// 用户认证
export const auth        = payload => POST('/user/auth', payload);

// 用户认证信息
export const getAuthInfo = payload => GET('/user/authInfo', payload);

// 用户登出
export const logout      = payload => POST('/user/logout', payload);

// 用户列表
export const getUserList = payload => GET('/user/list', payload);

// 发送验证码
export const sendCode    = payload => POST('/sms/sendCode', payload);
