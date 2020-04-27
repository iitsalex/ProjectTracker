import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"
class Settings extends Component {
  render() {
    return (
      <div>
        <h3>Settings</h3>
        <Button type="submit">
          <Link to="/settings" style={{ color: '#FFF' }}>Temp Button</Link>
        </Button>
      </div>
    );
  }
}

export default Settings
