import type { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ResultAsync, errAsync } from "neverthrow";

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
const getFromRedux = (randValue: number): ResultAsync<User, UserNotFound> => {
  console.log("getFromRedux called with randValue:", randValue);
  if (randValue < 0.5) {
    return ResultAsync.fromSafePromise(Promise.resolve({ id: "1", name: "John Doe" }));
  } else {
    return errAsync(new UserNotFound("User not found in Redux store"));
  }
}

/**
 * APIからUserデータをとってくる関数。半分の割合でAPI内にデータが無いという状態を返す。
 * @param randValue 0~1のランダムな値
 */
const getFromApi = (randValue: number): ResultAsync<User, UserNotFound> => {
  console.log("getFromApi called with randValue:", randValue);
  if (randValue < 0.5) {
    return ResultAsync.fromSafePromise(Promise.resolve({ id: "2", name: "Jane Doe" }));
  } else {
    return errAsync(new UserNotFound("User not found in API"));
  }
}

/**
 * ReduxやAPIからUserデータをとってくる関数。まずはReduxからとってきて、Redux内にデータが無ければAPIからとってくる。
 */
const getUser = async (): Promise<User> => {
  return getFromRedux(Math.random())
    .orElse((err) => getFromApi(Math.random()))
    .then(r => r.isOk() ? Promise.resolve(r.value) : Promise.reject(r.error))
}

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({ queryConfig }: UseUserOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
  });
};
