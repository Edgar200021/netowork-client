export type ApiError = {
	status: "error";
	error: string;
};

export type ApiValidationError<T extends string[]> = {
	status: "error";
	errors: Partial<Record<T[number], string[]>>;
};

export type ApiSuccessResponse<T> = {
	status: "success";
	data: T;
};
