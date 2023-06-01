import { useRecoilValue } from 'recoil';
import { baseURLSelector } from '../store/server';
import { AUTH } from '../constants/auth';
import { useCallback } from 'react';

export type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const useFetch = (endPoint: string) => {
  const baseURL = useRecoilValue(baseURLSelector);

  const handleFetch = useCallback(
    async (method: FetchMethod, body: {}, id?: number) => {
      const response = await fetch(
        `${baseURL}${endPoint}${id ? `/${id}` : ''}`,
        {
          method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Basic ${AUTH}`,
          },
        }
      );

      if (!response.ok) throw new Error(`error code : ${response.status}`);

      const data = await response.text();
      if (!data) return null;
      return JSON.parse(data);
    },
    [baseURL]
  );

  return { handleFetch };
};

export default useFetch;
