import type { ApiSuccessResponse } from "@/types/api";
import type { Work } from "@/types/work";

export type GetMyWorksRequest = null;
export type GetMyWorksResponse = ApiSuccessResponse<Work[]>;

export type CreateWorkRequest = {
	title: string;
	images: File[];
};
export type CreateWorkResponse = ApiSuccessResponse<Work>;

export type DeletePortfolioJobRequest = {
	id: Work["id"];
};
export type DeleteWorkResponse = ApiSuccessResponse<null>;
