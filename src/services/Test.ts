import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from './BaseService';
import { useQuery } from 'react-query';
// react-query example
export const useQueryGetTest = ({ id, name }: { id: number; name: string }) => {
  return useQuery('testData', () => getTest({ id: id, name: name }), {
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

// 요청 형식 첫번째
export const getTest = async ({ id, name }: { id: number; name: string }) => {
  const params = {
    id: id,
    name: name,
  };
  const response = await ajaxGet('/api/hello', { params });
  return response;
};

// 요청 형식 두 번째
export const getTest2 = async (id: number, name: string) => {
  const params = {
    id: id,
    name: name,
  };
  const response = await ajaxGet('/api/hello', { params });
  return response;
};

// 요청 형식 세 번째
export const getTest3 = async (params: any) => {
  const response = await ajaxGet('/api/hello', { params });
  return response;
};

export const postTest = async ({ id, name }: { id: number; name: string }) => {
  const params = {
    id: id,
    test: name,
  };
  const response = await ajaxPost('/api/hello', params);
  return response;
};

export const putTest = async ({ id, name }: { id: number; name: string }) => {
  const params = {
    id: id,
    test: name,
  };
  const response = await ajaxPut('/api/hello', params);
  return response;
};

export const delTest = async ({ id, name }: { id: number; name: string }) => {
  const params = {
    id: id,
    test: name,
  };
  const response = await ajaxDelete('/api/hello', params);
  return response;
};