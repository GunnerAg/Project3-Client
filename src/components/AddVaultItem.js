import React, { Component } from 'react';
import { Form,Row,Col } from 'react-bootstrap';



export default class AddVaultItem extends Component {

    state = {
        vaultItemDetails: {},
     }
      

    onChange=(e)=>{
       let value = e.currentTarget.value;
       let property = e.currentTarget.name;
       let clonedItem = JSON.parse(JSON.stringify(this.state.vaultItemDetails))
       clonedItem[property]=value
       this.setState({
        vaultItemDetails:clonedItem
       })
    }

    render() {
        const{ title,description,fileUrl,keywords } = this.state.vaultItemDetails
        return (
            <div>
                    <Form onSubmit={(e)=>{
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
                                <Form.Control placeholder="Link to videos" onChange={this.onChange} value={fileUrl} type='text' name='fileUrl'/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Keywords" onChange={this.onChange} value={keywords} type='text' name='keywords'/>
                            </Col>
                        </Row>
                        <input type='submit' value={'ADD'} />
                    </Form>
            </div>
        )
    }
}