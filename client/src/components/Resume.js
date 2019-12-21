import React, {Component} from 'react';
import Profile from './Profile';
import Education from './Education';

export class Resume extends Component {
  state = {
    step: 1,
    // Personal Profile Details...
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    facebook: '',
    instagram: '',

    // Education Details...
    college: '',
    fromyear: '',
    toyear: '',
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
      phone,
      website,
      github,
      linkedin,
      twitter,
      facebook,
      instagram,
      interests,
    } = this.state;
    const values = {
      firstname,
      lastname,
      email,
      phone,
      website,
      github,
      linkedin,
      twitter,
      facebook,
      instagram,
      interests,
    };
    switch (step) {
      case 1:
        return (
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Profile
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Education
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
              />
            </div>
          </div>
        );
      case 3:
        return <h1>Projects Details</h1>;
      case 4:
        return <h1>Experience Details</h1>;
    }
  }
}

export default Resume;
