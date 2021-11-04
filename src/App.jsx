import "./App.css";
import Calendar from "./components/Calendar/index.jsx";

function App() {
	return (
		<div className="app">
			<div className="container">
				<Calendar type="range" />
			</div>
		</div>
	);
}
//TODO
//fix styled components, make them for props
//add eslint, and prettier files configuration
//create additional components and functions
//rename files

export default App;
