import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { PageLoader } from "./components/ui/pageLoader";
import { router } from "./config/router";
import { useHandleError } from "./hooks/useHandleError";
import { baseApi } from "./store/baseApi";
import { useGetMeQuery } from "./store/user/userApi";

function App() {
	//  const { isLoading, isError } = baseApi.useHealthCheckQuery(null)
	const { isLoading: getMeLoading, error } = useGetMeQuery(null);

	useHandleError(error, error && (error as FetchBaseQueryError).status === 401);

	if (getMeLoading) return <PageLoader />;
	//  if (error) return <h1>Наш сервис временно недоступен</h1>

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer position="top-right" />
		</>
	);
}

export default App;
