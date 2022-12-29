import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { FiEdit2 , FiDelete } from 'react-icons/fi'

const HomePage = () => {
  const { userData, setUserData, access, setAccess, navigate, logout } = useContext(DataContext);
  const [draftDetails, setDraftDetails] = useState([]);


  useEffect(() => {
    const validUser = JSON.parse(localStorage.getItem('loginuser'));
    if ((validUser).length === 0) {
      navigate('/')
    }
  }, []);

  // ------------------------Doubt--------------------------
  useEffect(() => {
    if (access === true) {
      toast.success("Login Success")
    }
  }, []);
  // -------------------------------------------------------

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Api.get('/drafted')
          setDraftDetails(response.data)
        } catch (err) {
          console.log(err.message)
        }
        fetchData();
      }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }
  const handleDraft = async () => {
    const Data = {
      name: userData.name,
      age: userData.age,
      phone: userData.phone,
      address: userData.address,
    }
    try {
      const response = await Api.post('/drafted/', Data)
      // console.log(response.data)
      setDraftDetails([...draftDetails, response.data])
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleEdit = () => {

  }
  const handleDelete = async (id) => {
     const response = draftDetails.filter((obj) => obj.id !== id)
     setDraftDetails(response)
    try {
       await Api.delete(`/drafted/${id}`)
    } catch ( err ) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <Container>
        <Button onClick={() => logout()}>Logout</Button>
        <Row>
          <Col md={6}>
            <Form>
              <div className='col-md-6'>
                <FormGroup >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    name='name'
                    value={userData.name}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter age'
                    name='age'
                    value={userData.age}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
              </div>
              <div className='col-md-6'>
                <FormGroup>
                  <Form.Label>phone Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter phone Number'
                    name='phone'
                    value={userData.phone}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Address'
                    name='address'
                    value={userData.address}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
              </div>

            </Form>
            <div>
              <Button onClick={() => handleDraft()}>Draft</Button>
            </div>
          </Col>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>phone</th>
                  <th>Address</th>
                  <th> Edit </th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  draftDetails.map((data) =>
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.age}</td>
                      <td>{data.phone}</td>
                      <td>{data.address}</td>
                      <td>
                        <FiEdit2 
                        role='button'
                        tabIndex= '0'
                        onClick={() => handleEdit(data.id)}
                        />
                      </td>
                      <td>
                        <FiDelete 
                        role='button'
                        tabIndex= '0'
                        onClick={() => handleDelete(data.id)}
                        />
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </Col>

        </Row>
      </Container>
      <ToastContainer /></div>
  )
}

export default HomePage