import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "./auth/authSlice";
import { baseApi } from "./baseApi";
import { workSlice } from "./portfolio/workSlice";
import { taskSlice } from "./tasks/taskSlice";

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[authSlice.reducerPath]: authSlice.reducer,
		[workSlice.reducerPath]: workSlice.reducer,
		[taskSlice.reducerPath]: taskSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			baseApi.middleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
