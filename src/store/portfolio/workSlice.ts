import { FILES_MAX_SIZE, WORK_IMAGES_MAX_COUNT } from "@/constants/const";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type State = {
	files: {
		id: string;
		file: File;
		imgUrl: string;
	}[];
	title: string;
	showTitle: boolean;
	isOpened: boolean;
};

const initialState: State = {
	files: [],
	title: "",
	showTitle: false,
	isOpened: false,
};

export const workSlice = createSlice({
	name: "work",
	initialState,
	reducers: {
		setFiles: (state, action: PayloadAction<File[]>) => {
			if (
				action.payload.length === 0 ||
				state.files.length >= WORK_IMAGES_MAX_COUNT
			)
				return;

			if (!state.showTitle) {
				state.showTitle = true;
			}

			const remainingCount = WORK_IMAGES_MAX_COUNT - state.files.length;
			const newFiles = action.payload
				.slice(0, remainingCount)
				.filter((file) => file.size < FILES_MAX_SIZE)
				.map((file) => ({
					file,
					imgUrl: URL.createObjectURL(file),
					id: uuidv4(),
				}));

			state.files = [...state.files, ...newFiles];
		},

		deleteFile: (
			state,
			action: PayloadAction<State["files"][number]["id"]>,
		) => {
			const imgUrl = state.files.find(
				(file) => file.id === action.payload,
			)?.imgUrl;
			if (imgUrl) {
				URL.revokeObjectURL(imgUrl);
			}
			state.files = state.files.filter((file) => file.id !== action.payload);

			if (state.files.length === 0) {
				state.showTitle = false;
			}
		},

		setTitle: (state, action: PayloadAction<State["title"]>) => {
			state.title = action.payload;
		},
		setIsOpened: (state, action: PayloadAction<State["isOpened"]>) => {
			state.isOpened = action.payload;
		},
		clearState: (state) => {
			for (const { imgUrl } of state.files) {
				URL.revokeObjectURL(imgUrl);
			}

			state.files = [];
			state.title = "";
			state.showTitle = false;
		},
	},
	selectors: {
		getFiles: (state) => state.files,
		getTitle: (state) => state.title,
		getShowTitle: (state) => state.showTitle,
		getIsOpened: (state) => state.isOpened,
	},
});

export const { actions: workActions, selectors: workSelectors } = workSlice;
