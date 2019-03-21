import { GET, POST, DELETE } from "@/utils/request";

// 硬盘列表
export const getDiskList = payload => GET("/storage/hardDisk/list", payload);

