import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class ConfirmModal extends React.Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    //console.log('props : ' , this.props)
    
    return (
      <Modal
    trigger={<Button className={this.props.className} onClick={this.handleOpen}>{this.props.buttonName}</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='browser' content="Are you sure to delete this post ?" />
        <Modal.Content>
          <h3>Title : {this.props.post.title}</h3>
          <h3>Content : {this.props.post.content}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose} inverted>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={this.props.onConfirmClick} inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ConfirmModal;