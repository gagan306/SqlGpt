import './App.css';
import Sidebar from './offcanvas';
import GridBackgroundDemo from './Background.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
return (
<Router>
<div className="App">
<Sidebar />
<GridBackgroundDemo />

</div>
</Router>
);
}
export default App;