import { GET, POST, DELETE } from "@/utils/request";

// SSH密钥对列表
export const getKeyPairList = payload => GET("compute/secretKey/list", payload);

// 创建密钥对
export const createKeyPair  = payload => POST("compute/secretKey/create", payload);

// 导入密钥对
export const importKeyPair  = payload => POST("compute/secretKey/import", payload);

// 删除密钥对
export const deleteKeyPair  = payload => DELETE("compute/secretKey/delete", payload);

// 修改密钥对
export const editKeyPair    = payload => POST("compute/secretKey/modify", payload);

// 绑定标签
export const bindLabel      = payload => POST("compute/secretKey​/label/bind", payload);

// 下载
export const downloadKeyPair = payload => POST('/compute/secretKeydownload', payload);