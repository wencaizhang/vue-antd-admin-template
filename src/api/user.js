
import { POST } from '@/utils/request';

// 镜像列表
export const login = payload => POST('/user/login', payload);
