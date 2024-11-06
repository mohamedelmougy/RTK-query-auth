import apiSlice from "../../api/apiSlice";

const usersAliSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const {useGetUsersQuery}=usersAliSlice