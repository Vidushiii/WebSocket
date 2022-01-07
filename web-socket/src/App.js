import Homepage from "./Forum/Homepage";
import { Switch, Route } from 'react-router-dom';
import ChannelPage from "./Forum/ChannelPage";

function App() {
  return (
    <><div className="App">
      <Homepage />
    </div>
    <Switch>
        <Route path="/forum" exact component={Homepage} />
        <Route path="/forum/post" exact component={ChannelPage} />
      </Switch></>
  );
}

export default App;
