import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export const AppLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<footer>footer</footer>
			</>
	);
};
