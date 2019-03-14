import { GET, POST, DELETE } from "@/utils/request";

// 实例列表
export const getinstanceList = payload => GET("​/compute/instance​/list", payload);

// 区域列表
export const getRegionList = payload => GET("​/compute/instance​/region​/list", payload);

// 资源列表
export const getVMList = payload => GET("​/compute/instance​/queryVMs", payload);

// 创建实例
export const createInstance = payload => POST("​/compute/instance​/create", payload);

// 删除实例
export const deleteInstance = payload => DELETE("​/compute/instance​/delete", payload);

// 启动
export const startInstance = payload => POST("​/compute/instance​/start", payload);

// 关机
export const shutdown = payload => POST("​/compute/instance​/shutdown", payload);

// 重启云主机
export const restart = payload => POST("​/compute/instance​/restart", payload);

// 软重启
export const softreboot = payload => POST("​/compute/instance​/softreboot", payload);

// 创建快照
export const createSnapshoot = payload => POST("​/compute/instance​/snapshoot​/create", payload);

// 绑定公网IP
export const bindIP = payload => POST("​/compute/instance​/publicIP​/bind", payload);

// 解绑公网IP
export const unbindIP = payload => POST("​/compute/instance​/publicIP​/unbind", payload);

// 重建云主机
export const rebuild = payload => POST("​/compute/instance​/rebuild", payload);

// 编辑云主机安全组
export const editSecuritygroup = payload =>
  POST("​/compute/instance​/securitygroup​/edit", payload);

// 主机概况
export const overview = payload => GET("​/compute/instance​/overview", payload);
