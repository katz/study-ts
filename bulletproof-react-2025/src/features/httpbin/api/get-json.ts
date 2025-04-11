
import { queryOptions, useQuery } from '@tanstack/react-query';
import type { HttpbinJson } from '@/types/api';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';

export const getJson = (): Promise<{ data: HttpbinJson[] }> => {
  return api.get('/json');
};

export const getJsonQueryOptions = () => {
  return queryOptions({
    queryKey: ['json'],
    queryFn: () => getJson(),
  });
};

type UseJsonOptions = {
  queryConfig?: QueryConfig<typeof getJsonQueryOptions>;
};

export const useJson = ({ queryConfig }: UseJsonOptions = {}) => {
  return useQuery({
    ...getJsonQueryOptions(),
    ...queryConfig,
  });
};
