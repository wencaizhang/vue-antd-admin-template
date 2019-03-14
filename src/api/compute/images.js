import { GET, POST, DELETE } from "@/utils/request";

// 镜像列表
export const getImageList = payload => GET("​/compute​/image​/list", payload);

// 镜像格式列表
export const formatImage = payload => GET("​/compute​/image​/format", payload);

// 创建镜像
export const createImage = payload => POST("​/compute​/image​/create", payload);

// 编辑镜像
export const editImage = payload => POST("​/compute​/image​/edit", payload);
