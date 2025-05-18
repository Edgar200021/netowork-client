import { WORK_IMAGES_FILE_NAME } from "@/constants/const";
import { TAGS } from "@/constants/redux";
import { baseApi } from "../baseApi";
import type {
	CreateWorkRequest,
	CreateWorkResponse,
	DeletePortfolioJobRequest,
	DeleteWorkResponse,
	GetMyWorksRequest,
	GetMyWorksResponse,
} from "./types";

export const worksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMyWorks: builder.query<GetMyWorksResponse, GetMyWorksRequest>({
			query: () => ({
				url: "/works",
			}),
			providesTags: [TAGS.works],
		}),

		createWork: builder.mutation<CreateWorkResponse, CreateWorkRequest>({
			query: (body) => {
				const formData = new FormData();
				formData.append("title", body.title);

				for (const image of body.images) {
					formData.append(WORK_IMAGES_FILE_NAME, image);
				}

				return { url: "/works", method: "POST", body: formData };
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(
					worksApi.util.updateQueryData("getMyWorks", null, (draft) => {
						draft.data.push(data.data);
					}),
				);
			},
		}),
		deleteWork: builder.mutation<DeleteWorkResponse, DeletePortfolioJobRequest>(
			{
				query: ({ id }) => ({
					url: `/works/${id}`,
					method: "DELETE",
				}),
				onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
					await queryFulfilled;
					dispatch(
						worksApi.util.updateQueryData("getMyWorks", null, (draft) => {
							draft.data = draft.data.filter((work) => work.id !== id);
						}),
					);
				},
			},
		),
	}),
});

export const {
	useGetMyWorksQuery,
	useCreateWorkMutation,
	useDeleteWorkMutation,
} = worksApi;
