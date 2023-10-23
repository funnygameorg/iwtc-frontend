import { ajaxGet } from "./BaseService";

export const worldCupAllList = async () => {
  const param = {
    page: 0,
    size: 1,
    sort: 1
  
  }
  const response = await ajaxGet('/world-cups', param);
  return response;
};