import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"
import FadeIn from 'react-fade-in';

class Settings extends Component {
  render() {
    return (
      <div>
        <FadeIn>
          <h3>Settings</h3>
          <Button type="submit">
            <Link to="/settings" style={{ color: '#FFF' }}>Temp Button</Link>
          </Button>
        </FadeIn>
      </div>
    );
  }
}

export default Settings
