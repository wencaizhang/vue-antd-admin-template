
import { GET, POST } from '@/utils/request';

// 用户登录
export const userLogin   = payload => POST('/user/login', payload);

// 用户创建
export const createUser  = payload => POST('/user/create', payload);

// 修改密码
export const modifyPwd   = payload => POST('/user/modifyPwd', payload);

// 修改邮箱
export const modifyEmail = payload => POST('/user/modifyEmail', payload);

// 修改手机
export const modifyPhone = payload => POST('/user/modifyPhone', payload);

// 忘记密码
export const forgotPwd   = payload => POST('/user/forgotPwd', payload);

// 用户基本资料
export const getBaseInfo = payload => GET('/user/base', payload);

// 更新用户资料
export const updateUserInfo = payload => POST('/user/update', payload);

// 用户认证
export const auth        = payload => POST('/user/auth', payload);

// 用户认证 升级到企业认证
export const authUpgrade = payload => POST('/user/type/upgrade', payload);

// 用户实名认证
export const getAuthInfo = payload => GET('/user/authInfo', payload);

// 用户登出
export const logout      = payload => POST('/user/logout', payload);

// 用户列表
export const getUserList = payload => GET('/user/list', payload);

// 发送验证码
export const sendCode    = payload => POST('/sms/sendCode', payload);

// 向邮箱发送验证码
export const sendEmailCode = payload => POST('/email/sendCode', payload);
