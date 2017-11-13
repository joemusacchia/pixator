import React, {Component} from 'react';

class FormTile extends Component {
  constructor(props){
    super(props)
    this.state = {
      body: '',
      error: ''
    }
    this.clearForm = this.clearForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  clearForm() {
    this.setState({
      body: ''
    })
  }

  handleChange(e) {
    this.setState({body: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let formPayLoad;
    if (this.state.body != '') {
      formPayLoad = {
        body: this.state.body,
        export_id: this.props.current_export.id,
        user_id: this.props.current_user.id
      }
      this.props.addNewComment(formPayLoad)
      this.clearForm()
      this.setState({error: ''})
    } else {
      this.setState({error: `You can't submit an empty comment!`})
    }
  }

  render() {
    let error = <p className="form-error-message"/>
    if (this.state.error.length > 0) {
      error = <p className="form-error-message">{this.state.error}</p>
    }
    return(
      <div>
        <form>
          <h3>Write a comment for this export</h3>
          <label>
            <textarea
              name = {"body"}
              value = {this.state.body}
              onChange = {this.handleChange}
              type = "text"
            />
          </label>

          <button className="add-comment-button upload-button" type="submit" onClick={this.handleSubmit}>Add comment</button>
          {error}
        </form>
      </div>
    )
  }
}

export default FormTile
