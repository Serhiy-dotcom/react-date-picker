import "./App.css";
import Calendar from "./components/Calendar/index.jsx";

function App() {
	return (
		<div className="app">
			<div className="container">
				<Calendar type="multiRange" />
			</div>
		</div>
	);
}

//TODO
//transform date array into object

export default App;
