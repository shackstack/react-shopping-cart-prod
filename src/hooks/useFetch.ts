import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../constants/auth.ts';
import { useRecoilValue } from 'recoil';
import { serverAtom } from '../stores/serverStore.ts';
import baseURL from '../../config.ts';

type FetchStatus = 'idle' | 'loading' | 'fail' | 'success';

export type FetchState<T> = {
  status: FetchStatus;
  data: T | null;
  error: Error | null;
};

const useFetch = <T>(url: string, method = 'GET'): [FetchState<T>, (body?: any, param?: number | string) => Promise<void>] => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const serverName = useRecoilValue(serverAtom);

  const navigate = useNavigate();

  const fetchData = useCallback(
    async ({ body, param }: { body?: any; param?: string | number }) => {
      const serverUrl = baseURL[serverName];
      const urlWithParam = param ? `${serverUrl + url}/${param}` : `${serverUrl + url}`;

      setFetchState((prevState) => ({ ...prevState, status: 'loading', error: null }));

      try {
        const response: Response = await fetch(urlWithParam, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: { 'Content-Type': 'application/json', authorization: `Basic ${auth}` },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const responseData = await response.text();
        const data: T = responseData ? JSON.parse(responseData) : null;

        setFetchState({ status: 'success', data, error: null });
      } catch (error) {
        setFetchState((prevState) => ({ ...prevState, status: 'fail', error: error as Error }));
        // navigate('/error', { state: { error: error as Error } });
      }
    },
    [url, method, navigate, serverName]
  );

  useEffect(() => {
    if (method.toLowerCase() === 'get') {
      fetchData({});
    }
  }, [fetchData, method]);

  return [fetchState, fetchData];
};

export default useFetch;
