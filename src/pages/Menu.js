import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

/* URL's to consume API REST from BackEnd-BL project */
const getAllUsers = "http://localhost:8081/blautech/get";
const updateUser = "http://localhost:8081/blautech/update/";
const createUser = "http://localhost:8081/blautech/create";
const deleteUser = "http://localhost:8081/blautech/delete/";

/*Default data to construct table*/
let data = [
  {
    cui: "",
    name: "",
    userName: "",
    mail: "",
    password: "",
    age: "",
  },
];

class Menu extends Component {

  state = {
    data: data,
    updateModal: false,
    createModal: false,
    form: {
      cui: "",
      name: "",
      userName: "",
      mail: "",
      password: "",
      age: "",
    },
  };

  /*When Update button is clicked, this method open the update Modal */
  showUpdateModal = (dataUser) => {
    this.setState({
      form: dataUser,
      updateModal: true,
    });
  };

  
  /*When Update button is clicked, this method close the update Modal */
  closeUpdateModal = () => {
    this.setState({ updateModal: false });
  };

  
  /*When Update button is clicked, this method open the create Modal */
  showCreateModal = () => {
    this.setState({
      createModal: true,
    });
  };

  /*When Update button is clicked, this method close the create Modal */
  closeCreateModal = () => {
    this.setState({ createModal: false });
  };

  /* ----------------------------------------------------- update user -----------------------------------------------------------------------*/

  editUser = async (dataUser) => {
    var user = {
      cui: dataUser.cui,
      name: dataUser.name,
      userName: dataUser.userName,
      mail: dataUser.mail,
      password: dataUser.password,
      age: dataUser.age,
    };
    console.log(user);
    await fetch(updateUser + dataUser.cui, {
      method: "PUT",
      body: JSON.stringify(user), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        var counter = 0;
        var tempArray = this.state.data;
        tempArray.map((dataMap) => {
          if (dataUser.cui === dataMap.cui) {
            tempArray[counter].cui = dataUser.cui;
            tempArray[counter].name = dataUser.name;
            tempArray[counter].userName = dataUser.userName;
            tempArray[counter].mail = dataUser.mail;
            tempArray[counter].age = dataUser.age;
          }
          counter++;
        });
        this.setState({ data: tempArray, updateModal: false });
        return response.json();
      })
      .catch((error) => console.error("Error:", error)).then(response => alert('Success: '+ response.msg));
  };

  /* ----------------------------------------------------- delete user -----------------------------------------------------------------------*/

  deleteUser = async (dataUser) => {
    var selectOption = window.confirm(
      "You wanna delete this user? " + dataUser.userName
    );
    if (selectOption === true) {
      await fetch(deleteUser + dataUser.cui, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          var counter = 0;
          var tempArray = this.state.data;
          tempArray.map((dataMap) => {
            if (dataUser.cui === dataMap.cui) {
              tempArray.splice(counter, 1);
            }
            counter++;
          });
          this.setState({ data: tempArray, updateModal: false });
          return response.json();
        })
        .catch((error) => console.error("Error:", error)).then(response => alert('Success: '+ response.msg));
    }
  };

  /* ----------------------------------------------------- create user -----------------------------------------------------------------------*/
  insertUser = async () => {
    var userValues = { ...this.state.form };
    var user = {
      cui: userValues.cui,
      name: userValues.name,
      userName: userValues.userName,
      mail: userValues.mail,
      password: userValues.password,
      age: userValues.age,
    };
    await fetch(createUser, {
      method: "POST", 
      body: JSON.stringify(user), 
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        var lista = this.state.data;
        lista.push(userValues);
        this.setState({ createModal: false, data: lista });
        return response.json();
      })
      .catch((error) => console.error("Error:", error)).then(response => alert('Success: '+ response.msg));
  };

  /*This method is shooted when something is changed */
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  /*When component was monted, this method run */
  componentDidMount() {
    fetch(getAllUsers)
      .then((response) => response.json())
      .then((d) => {
        this.setState({ data: d });
      });
  }

  render() {
    return (
      <>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>CUI</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Mail</th>
                <th>Age</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dataUser) => (
                <tr key={dataUser.cui}>
                  <td>{dataUser.cui}</td>
                  <td>{dataUser.name}</td>
                  <td>{dataUser.userName}</td>
                  <td>{dataUser.mail}</td>
                  <td>{dataUser.age}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.showUpdateModal(dataUser)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={() => this.deleteUser(dataUser)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <Button color="success" onClick={() => this.showCreateModal()}>
            Create user
          </Button>
          <br />
          <br />
        </Container>

        <Modal isOpen={this.state.updateModal}>
          <ModalHeader>
            <div>
              <h3>Edit user</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>CUI:</label>

              <input
                className="form-control"
                readOnly
                name="cui"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cui}
              />
            </FormGroup>

            <FormGroup>
              <label>Name:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>

            <FormGroup>
              <label>User Name:</label>
              <input
                className="form-control"
                name="userName"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.userName}
              />
            </FormGroup>

            <FormGroup>
              <label>mail:</label>
              <input
                className="form-control"
                name="mail"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.mail}
              />
            </FormGroup>

            <FormGroup>
              <label>Password:</label>
              <input
                className="form-control"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Age:</label>
              <input
                className="form-control"
                name="age"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.age}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editUser(this.state.form)}
            >
              Edit
            </Button>
            <Button color="danger" onClick={() => this.closeUpdateModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.createModal}>
          <ModalHeader>
            <div>
              <h3>Create user</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>CUI:</label>

              <input
                className="form-control"
                name="cui"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Name:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>User Name:</label>
              <input
                className="form-control"
                name="userName"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Mail:</label>
              <input
                className="form-control"
                name="mail"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Password:</label>
              <input
                className="form-control"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Age:</label>
              <input
                className="form-control"
                name="age"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertUser()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.closeCreateModal()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Menu;
