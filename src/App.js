import {BrowserRouter} from "react-router-dom";
import Loginform from "./login/loginform";
import Appstart from "./appstart/appstart"

function App(props) {

  const generateLoginForm = () =>{
    return props.login? <Appstart/> : <Loginform/>;
  }


  return (
      <div>
        {generateLoginForm()}
      </div>
  );
}

export default App;
