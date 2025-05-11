import type { User } from "@/types/user";
import type { ApiSuccessResponse } from "../../types/api";

export type GetMeRequest = null;
export type GetMeResponse = ApiSuccessResponse<User>;

export type UpdateProfileRequest = Partial<
	Pick<User, "email" | "aboutMe" | "firstName" | "lastName">
> & {
	avatar?: File;
};
export type UpdateProfileResponse = ApiSuccessResponse<string>;

export type ChangePasswordRequest = {
	oldPassword: string;
	newPassword: string;
	newPasswordConfirmation: string;
};
export type ChangePasswordResponse = ApiSuccessResponse<string>;
