import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"
class Settings extends Component {
  render() {
    return (
      <div>
      <br/>
      <h1>Settings</h1>
      <br/>
      <Button type="submit">
        <Link to="/settings" style={{ color: '#FFF' }}>Temp Button</Link>
      </Button>
      </div>
    );
  }
}

export default Settings
