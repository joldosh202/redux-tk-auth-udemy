import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/account/login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/account/register/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    mentorRegister: builder.mutation({
      query: (credentials) => ({
        url: "/account/register/mentor/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
export const { useRegisterMutation } = authApiSlice;
export const { useMentorRegisterMutation } = authApiSlice;
