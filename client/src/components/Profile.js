import React, {Component} from 'react';
import {TextField, Button, Container, Divider} from '@material-ui/core';
import axios from 'axios';
import {saveAs} from 'file-saver';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {Row, Col} from 'react-bootstrap';

export class Profile extends Component {
  continue = e => {
    e.preventDefault ();
    this.props.nextStep ();
  };

  createAndDownloadPDF = () => {
    axios
      .post ('/create-pdf', this.state)
      .then (() => {
        axios
          .get ('fetch-pdf', {responseType: 'blob'})
          .then (res => {
            const pdfBlob = new Blob ([res.data], {type: 'application/pdf'});
            saveAs (pdfBlob, 'Resume.pdf');
          })
          .catch (err => {
            console.log (err);
          });
      })
      .catch (err => {
        console.log (err);
      });
  };

  handleChange = ({target: {value, name}}) => {
    this.setState ({[name]: value});
  };

  render () {
    const {values} = this.props;
    return (
      <div>
        <TextField
          variant="outlined"
          name="firstname"
          label="First Name"
          onChange={this.handleChange}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          name="lastname"
          label="Last Name"
          onChange={this.handleChange}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          name="email"
          label="Email"
          onChange={this.handleChange}
        />
        <br />
        <br />
        <Container className="col-lg-4 text-center">
          <Row>
            <Col xs={4} />
            <Col xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.nextStep}
              >
                <NavigateBeforeIcon /> Back
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.nextStep}
              >
                Next <NavigateNextIcon />
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
        </Container>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={this.createAndDownloadPDF}
        >
          Generate PDF
        </Button> */}
      </div>
    );
  }
}

export default Profile;
