import { GET, POST, DELETE } from '@/utils/request';

// 硬盘列表
export const getDiskList      = payload => GET('/storage/hardDisk/list', payload);

// 硬盘状态
export const getDiskDetail    = volumeId => GET(`/storage/hardDisk/detail/${volumeId}`)

// 创建硬盘
export const createDisk       = payload => POST('/storage/hardDisk/create', payload);

// 删除硬盘
export const deleteDisk       = payload => DELETE('/storage/hardDisk/delete', payload);

// 编辑硬盘
export const editDisk         = payload => POST('/storage/hardDisk/edit', payload);

// 卸载硬盘
export const uninstallDisk    = payload => POST('/storage/hardDisk/uninstall', payload);

// 扩容硬盘
export const dilatancyDisk    = payload => POST('/storage/hardDisk/dilatancy', payload);

// 挂载硬盘到主机
export const mountDisk        = payload => POST('/storage/hardDisk/mount', payload);

// 创建快照
export const createSnapshoot  = payload => POST('/storage/hardDisk/snapshoot/create', payload);

// 创建硬盘备份
export const createBackup     = payload => POST('/storage/hardDisk/backup/create', payload);

// 更改硬盘类型
export const changeDiskType   = payload => POST('/storage/hardDisk/type/modify', payload);

// 克隆硬盘
export const cloneDisk        = payload => POST('/storage/hardDisk/clone', payload);

// 上传硬盘到镜像
export const uploadDisk       = payload => POST('/storage/hardDisk/image/upload', payload);

// 快照列表
export const getSnapshootList = payload => GET('/storage/snapshoot/list', payload);

// 删除快照
export const deleteSnapshoot  = payload => DELETE('/storage/snapshoot/delete', payload);

// 编辑硬盘快照
export const editSnapshoot    = payload => POST('/storage/snapshoot/edit', payload);

// 备份列表
export const getBackupList    = payload => GET('/storage/backup/list', payload);

// 删除备份
export const deleteBackup     = payload => DELETE('/storage/backup/delete', payload);

// 恢复备份
export const restoreBackup    = payload => POST('/storage/backup/restore', payload);
