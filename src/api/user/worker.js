
import { GET, POST } from '@/utils/request';


export const workerLogin       = payload => POST('/worker/login', payload);
