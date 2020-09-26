import React, { Component } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            AlertText: "Some error",
            AlertVariant: "",
            ShowForm: true
        }
    }

    soap = () => {
        var user = document.getElementById("user").value;
        var pas = document.getElementById("Pas").value;


        var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope" xmlns:ns1="urn:ICUTech.Intf-IICUTech" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:enc="http://www.w3.org/2003/05/soap-encoding"><env:Body><ns1:Login env:encodingStyle="http://www.w3.org/2003/05/soap-encoding"><UserName xsi:type="xsd:string">' + user + '</UserName><Password xsi:type="xsd:string">' + pas + '</Password><IPs xsi:type="xsd:string"></IPs></ns1:Login></env:Body></env:Envelope>'

        axios.post('https://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech',
            xml).then(res => {
                var XMLParser = require('react-xml-parser');
                var xmlText = new XMLParser().parseFromString(res.request.responseText);    // Assume xmlText contains the example XML
                var successObj = xmlText.getElementsByTagName('return');
                var MesObj = JSON.parse(successObj[0].value);

                if (typeof MesObj['ResultMessage'] === "undefined") {
                    var userInf = "";
                    for (var key in MesObj) {
                        if (MesObj[key] !== "") {
                            userInf += key + ' : ' + MesObj[key] + ';\r\n'
                           
                        }
                    }
                    
                    this.setState({ AlertVariant: "success", AlertText: userInf });
                   
                }

                else {

                    this.setState({ AlertVariant: "danger", AlertText: MesObj.ResultMessage });
                     }


                this.setState({ showAlert: true, ShowForm: false });
                

            }).catch(err => {
                this.setState({ AlertVariant: "danger" });

            });




    }   

    render() {
        return (
            <div>
                <Container>

                    <Alert show={this.state.showAlert} variant={this.state.AlertVariant}>
                        {this.state.AlertText}
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => this.setState({ showAlert: false, ShowForm: true })} variant="outline-success">
                                Close
                            </Button>
                        </div>
                    </Alert>



                    <Row >
                        <Col className="col-lg-4 col-md-3 col-sm-2 col-1"></Col>
                        <Col >
                            <Form style={this.state.ShowForm ? {} : { display: 'none' }} >
                                <Form.Group controlId="user">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" placeholder="Username" />
                                </Form.Group>

                                <Form.Group controlId="Pas">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={() => this.soap()}>
                                    Login
                                </Button>
                            </Form>
                        </Col>
                        <Col className="col-lg-4 col-md-3 col-sm-2 col-1"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;