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

export default App;
