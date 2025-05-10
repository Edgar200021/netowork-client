import type { ApiSuccessResponse } from "@/types/api";
import type { Category } from "@/types/category";

export type GetAllCategoriesRequest = null;
export type GetAllCategoriesResponse = ApiSuccessResponse<Category[]>;
