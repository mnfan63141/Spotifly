import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
import Dashboard from "./Dashboard";


const code = new URLSearchParams(window.location.search).get('code'); //this is the code we're getting from the new url

/* It's a bit confusing that in index.js it calls only "./App"
But here it's calling the css file. How does compiler not get confused?
Also, how does "<code>src/App.js</code> work"? Is <code> a type of tag? or is it 
calling something? Also, notice how you can import the logo at the top.*/
function App() {
  return code ? <Dashboard code = {code}/> : <Login /> //return code to Dashboard if we find a code in url
}
export default App;
