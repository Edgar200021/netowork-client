import { TAGS } from "@/constants/redux";
import { authSlice } from "../auth/authSlice";
import { baseApi } from "../baseApi";
import type {
	ChangePasswordRequest,
	ChangePasswordResponse,
	GetMeRequest,
	GetMeResponse,
	UpdateProfileRequest,
	UpdateProfileResponse,
} from "./types";

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<GetMeResponse, GetMeRequest>({
			query: () => ({
				url: "/users/profile",
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;

				dispatch(authSlice.actions.setUser(data.data));
				dispatch(authSlice.actions.setIsAuthorized(true));
			},
			providesTags: [TAGS.user],
		}),
		updateProfile: builder.mutation<
			UpdateProfileResponse,
			UpdateProfileRequest
		>({
			query: (body) => {
				const formData = new FormData();

				if (body.aboutMe) formData.append("aboutMe", body.aboutMe);
				if (body.avatar) formData.append("avatar", body.avatar);
				if (body.email) formData.append("email", body.email);
				if (body.firstName) formData.append("firstName", body.firstName);
				if (body.lastName) formData.append("lastName", body.lastName);

				return {
					url: "/users/profile",
					method: "PATCH",
					body: formData,
				};
			},
			invalidatesTags: [TAGS.user],
		}),
		changePassword: builder.mutation<
			ChangePasswordResponse,
			ChangePasswordRequest
		>({
			query: (body) => ({
				url: "/users/profile/change-password",
				method: "PATCH",
				body,
			}),
		}),
	}),
});

export const {
	useGetMeQuery,
	useUpdateProfileMutation,
	useChangePasswordMutation,
} = userApi;
