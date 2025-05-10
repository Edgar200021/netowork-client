import { baseApi } from "../baseApi";
import type {
	GetAllCategoriesRequest,
	GetAllCategoriesResponse,
} from "./types";

export const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<
			GetAllCategoriesResponse,
			GetAllCategoriesRequest
		>({
			query: () => ({
				url: "/categories",
			}),
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;
