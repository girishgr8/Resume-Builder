import React, {Component, Profiler} from 'react';
import Profile from './Profile';

export class Resume extends Component {
  state = {
    step: 1,
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
    github: '',
    linkedin: '',
    facebook: '',
    medium: '',
    interests: '',
  };

  nextStep = () => {
    const {step} = this.state;
    this.setState ({
      step: step + 1,
    });
  };

  prevStep = () => {
    const {step} = this.state;
    this.setState ({
      step: step - 1,
    });
  };

  // Handling fields change....
  handleChange = input => e => {
    this.setState ({
      [input]: e.target.value,
    });
  };

  render () {
    const {step} = this.state;
    const {
      firstname,
      lastname,
      email,
      birthdate,
      github,
      linkedin,
      facebook,
      medium,
      interests,
    } = this.state;
    const values = {
      firstname,
      lastname,
      email,
      birthdate,
      github,
      linkedin,
      facebook,
      medium,
      interests,
    };
    switch (step) {
      case 1:
        return (
          <Profile
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return <h1>Education Details</h1>;
      case 3:
        return <h1>Projects Details</h1>;
      case 4:
        return <h1>Experience Details</h1>;
    }
  }
}

export default Resume;
