import './App.css';

import 'rsuite/dist/styles/rsuite-default.css';
import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import { Button, ButtonToolbar } from 'rsuite';
import { Schema } from 'rsuite';


import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});



class TextField extends React.PureComponent {
  render() {
    const { name, label, accepter, ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...props} />
      </FormGroup>
    );
  }
}



export default class App extends React.Component {
  constructor(props, getUser) {
    super(props);
    this.state = {
      formValue: {
        id: '',
        name: ''
      },
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    var mock = new MockAdapter (axios);

    mock.onGet("").reply(200, {
      user: [{
        id: 1,
        name: "Rafiul Islam"
      }]
    })

    axios.get("").then(response => {
      console.log(response.data);

      this.setState({
        formValue: {
          id: response.data.user[0].id,
          name: response.data.user[0].name
        }
      })
    })
  }


  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  }

  
  render() {
    // const { formValue } = this.state;

    return (
      <div style={{marginLeft: 15}}>
        
        <h1>This is a pet project</h1>

        <br/>
        <p>Name: {this.state.formValue.name}</p>
        {/* <p>Name: {getUser()}</p> */}
        <br/>

        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setState({ formValue });
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          // formValue={formValue}
          model={model}
        >
          <TextField name="name" label="Username" />

          <ButtonToolbar>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}