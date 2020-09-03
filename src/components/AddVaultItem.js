import React, { Component } from 'react';
import { Form,Button } from 'react-bootstrap';
import MultiSelect from './MultiSelect'
import './VaultItem.css'



export default class AddVaultItem extends Component {

    state = {
        vaultItemDetails: {},
     }
      

    onChange=(e, isMulti, name, val)=>{
       let value = e ? e.currentTarget.value: '';
       let property =  e? e.currentTarget.name: '';
       let clonedItem = JSON.parse(JSON.stringify(this.state.vaultItemDetails))
       clonedItem[property]=value
       if(isMulti){
           value= val ? val.map((element)=>element.value): []
           clonedItem[name]=value
       }
       else {
            clonedItem[property]=value
       }

       this.setState({
        vaultItemDetails:clonedItem
       })
    }

    render() {
        const{ title,description,fileUrl=[],keywords=[] } = this.state.vaultItemDetails
        return (
            <div className='add-vault-item'>
                    {/* <Form onSubmit={(e)=>{
                      e.preventDefault()
                      this.props.onAddVaultItem(e,this.state.vaultItemDetails)}}>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Title" onChange={this.onChange} value={title} type='text' name='title'/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="description" onChange={this.onChange} value={description} type='text' name='description'/>
                            </Col>
                        </Row>
                        <Row>
                             <Col>
                             <Form.Control placeholder="File link" onChange={this.onChange} value={fileUrl} type='text' name='fileUrl'/>
                                <MultiSelect onChange={this.onChange} value={fileUrl} name='fileUrl' />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Keywords" onChange={this.onChange} value={keywords} type='text' name='keywords'/>
                            </Col>
                        </Row>
                        <input type='submit' value={'ADD'} />
                    </Form> */}

                <Form onSubmit={(e)=>{
                    e.preventDefault()
                    this.props.onAddVaultItem(e,this.state.vaultItemDetails)}}> 
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={this.onChange} value={title} type='text' name='title'/>
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  onChange={this.onChange} value={description} type='text' name='description'/>
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>File links</Form.Label>
                    <MultiSelect onChange={this.onChange} value={fileUrl} name='fileUrl' />
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Keywords</Form.Label>
                    <MultiSelect onChange={this.onChange} value={keywords} type='text' name='keywords'/>
                </Form.Group>
                <Button id="button-general" type='submit'>Add</Button>
                </Form>


            </div>
        )
    }
}