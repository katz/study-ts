import type { QueryConfig } from '@/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { type Result, createOk, createErr, orElseAsyncForResult, isOk } from 'option-t/plain_result';

type User = {
  id: string;
  name: string;
};

class UserNotFound extends Error {
  override readonly name = "UserNotFound" as const;
  constructor(message: string, options?: { cause: unknown }) {
    super(message, options);
    this.cause = options?.cause;
  }
}

/**
 * ReduxからUserデータをとってくる関数。半分の割合でRedux内にデータが無いという状態を返す。
 * @param randValue 0~1のランダムな値
 */
const getFromRedux = async (randValue: number): Promise<Result<User, UserNotFound>> => {
  console.log("getFromRedux called with randValue:", randValue);
  if (randValue < 0.5) {
    return createOk({ id: "1", name: "John Doe" });
  } else {
    return createErr(new UserNotFound("User not found in Redux store"));
  }
}

/**
 * APIからUserデータをとってくる関数。半分の割合でAPI内にデータが無いという状態を返す。
 * @param randValue 0~1のランダムな値
 */
const getFromApi = async (randValue: number): Promise<Result<User, UserNotFound>> => {
  console.log("getFromApi called with randValue:", randValue);
  if (randValue < 0.5) {
    return createOk({ id: "2", name: "Jane Doe" });
  } else {
    return createErr(new UserNotFound("User not found in API"));
  }
}

/**
 * ReduxやAPIからUserデータをとってくる関数。まずはReduxからとってきて、Redux内にデータが無ければAPIからとってくる。
 */
const getUser = async (): Promise<User> => {
  // NOTE: パイプライン演算子欲しくなる
  const a = await getFromRedux(Math.random());
  const b = await orElseAsyncForResult(a, async (err) => await getFromApi(Math.random()));

  if (isOk(b)) {
    return b.val;
  } else {
    throw b.err;
  }
}

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['user-optiont'],
    queryFn: () => getUser(),
  });
};

type UseUserOptionTOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUserOptionT = ({ queryConfig }: UseUserOptionTOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
  });
};
