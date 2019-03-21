import { GET, POST, DELETE } from "@/utils/request";

// 网络列表
export const getNetworkList = payload => GET("/network/list", payload);

