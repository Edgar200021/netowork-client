import {
	FILES_MAX_SIZE,
	MAX_TASK_DESCRIPTION_LENGTH,
	MAX_TASK_TITLE_LENGTH,
	MIN_TASK_DESCRIPTION_LENGTH,
	MIN_TASK_TITLE_LENGTH,
	TASK_FILES_ALLOWED_TYPES,
	TASK_FILES_MAX_COUNT,
} from "@/constants/const";
import type { CreateTaskSchema } from "@/schemas/tasks/createTaskSchema";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = CreateTaskSchema & {
	step: number;
	totalSteps: number;
	validationErrorMessages: {
		[key in keyof CreateTaskSchema]?: string;
	};
};

const initialState: State = {
	title: "",
	description: "",
	categoryId: 0,
	subCategoryId: 0,
	price: 0,
	step: 1,
	totalSteps: 3,
	validationErrorMessages: {},
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		setDescription: (state, action: PayloadAction<string>) => {
			state.description = action.payload;
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
			state.subCategoryId = 0;
		},
		setSubCategoryId: (state, action: PayloadAction<number>) => {
			state.subCategoryId = action.payload;
		},
		setPrice: (state, action: PayloadAction<number>) => {
			state.price = action.payload;
		},
		setFiles: (state, action: PayloadAction<FileList>) => {
			state.files = action.payload;
		},
		setStep: (state, action: PayloadAction<"prev" | "next">) => {
			if (action.payload === "prev" && state.step > 1) {
				state.step -= 1;
				return;
			}

			if (action.payload === "next") {
				if (state.step === 1) {
					const titleLength = state.title.length;

					if (
						titleLength < MIN_TASK_TITLE_LENGTH ||
						titleLength > MAX_TASK_TITLE_LENGTH
					) {
						state.validationErrorMessages.title = `${titleLength < MIN_TASK_TITLE_LENGTH ? "Минимальная" : "Максимальная"} длина заголовка задачи ${titleLength < MIN_TASK_TITLE_LENGTH ? MIN_TASK_TITLE_LENGTH : MAX_TASK_TITLE_LENGTH} символов`;
					} else {
						state.validationErrorMessages.title = undefined;
					}

					if (state.categoryId === 0) {
						state.validationErrorMessages.categoryId =
							"Выберите категорию задачи";
					} else {
						state.validationErrorMessages.categoryId = undefined;
					}

					if (state.subCategoryId === 0) {
						state.validationErrorMessages.subCategoryId =
							"Выберите подкатегорию задачи";
					} else {
						state.validationErrorMessages.subCategoryId = undefined;
					}
				}

				if (state.step === 2) {
					const descriptionLength = state.description.length;

					if (
						descriptionLength < MIN_TASK_DESCRIPTION_LENGTH ||
						descriptionLength > MAX_TASK_DESCRIPTION_LENGTH
					) {
						state.validationErrorMessages.description = `${descriptionLength < MIN_TASK_DESCRIPTION_LENGTH ? "Минимальная" : "Максимальная"} длина описания задачи ${descriptionLength < MIN_TASK_DESCRIPTION_LENGTH ? MIN_TASK_DESCRIPTION_LENGTH : MAX_TASK_DESCRIPTION_LENGTH} символов`;
					} else {
						state.validationErrorMessages.description = undefined;
					}

					if (state.files) {
						if (state.files.length > TASK_FILES_MAX_COUNT) {
							state.validationErrorMessages.files = "Слишком много файлов";
							return;
						}

						if (
							Array.from(state.files).some(
								(file) =>
									file.size > FILES_MAX_SIZE ||
									!TASK_FILES_ALLOWED_TYPES.includes(file.type),
							)
						) {
							state.validationErrorMessages.files =
								"Слишком большой размер файла или неверный тип файла";
						} else {
							state.validationErrorMessages.files = undefined;
						}
					}
				}

				if (
					(Object.values(state.validationErrorMessages).length === 0 ||
						Object.values(state.validationErrorMessages).every(
							(value) => value === undefined,
						)) &&
					state.step < state.totalSteps
				) {
					state.step += 1;
					return;
				}

				if (state.step === state.totalSteps && state.price <= 0) {
					state.validationErrorMessages.price =
						"Цена не может быть меньше или равна 0";
					return;
				}
			}
		},
	},
	selectors: {
		getTitle: (state) => state.title,
		getDescription: (state) => state.description,
		getCategoryId: (state) => state.categoryId,
		getSubCategoryId: (state) => state.subCategoryId,
		getPrice: (state) => state.price,
		getFiles: (state) => state.files,
		getStep: (state) => state.step,
		getTotalSteps: (state) => state.totalSteps,
		getTitleErrorMessage: (state) => state.validationErrorMessages.title,
		getDescriptionErrorMessage: (state) =>
			state.validationErrorMessages.description,
		getCategoryIdErrorMessage: (state) =>
			state.validationErrorMessages.categoryId,
		getSubCategoryIdErrorMessage: (state) =>
			state.validationErrorMessages.subCategoryId,
		getFilesErrorMessage: (state) => state.validationErrorMessages.files,
		getPriceErrorMessage: (state) => state.validationErrorMessages.price,
	},
});

export const { actions: taskActions, selectors: taskSelectors } = taskSlice;
