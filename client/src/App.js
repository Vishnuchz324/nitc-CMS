import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<AuthProvider>
					<Home />
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
