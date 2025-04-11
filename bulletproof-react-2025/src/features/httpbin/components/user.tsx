import { useUser } from "../api/get-user";

export const User = () => {
  const { isLoading, isError, data, error, isFetched, isStale, refetch } = useUser();

  return (
    <div>
      {/* table to display isLoading, isError, data, error, isFetched, isStale, refetch */}
      <table>
        <thead>
          <tr>
            <th scope="col">
              prop
            </th>
            <th scope="col">
              value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              isLoading
            </td>
            <td>
              {isLoading ? "true" : "false"}
            </td>
          </tr>
          <tr>
            <td>
              isError
            </td>
            <td>
              {isError ? "true" : "false"}
            </td>
          </tr>
          <tr>
            <td>
              error
            </td>
            <td>
              {isError ? error.message : "No error"}
            </td>
          </tr>
          <tr>
            <td>
              data
            </td>
            <td>
              {data ? JSON.stringify(data) : new String(data)}
            </td>
          </tr>
          <tr>
            <td>
              isFetched
            </td>
            <td>
              {isFetched ? "true" : "false"}
            </td>
          </tr>
          <tr>
            <td>
              isStale
            </td>
            <td>
              {isStale ? "true" : "false"}
            </td>
          </tr>
          <tr>
            <td>
              refetch
            </td>
            <td>
              <button onClick={() => refetch()}>Refetch</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
