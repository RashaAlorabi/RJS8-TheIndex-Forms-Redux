import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import * as actionCreators from "./store/actions/index";
class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };
  ChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitBook = event => {
    event.preventDefault(); // privent refrech
    this.props.postBook(this.state, this.props.author, this.props.closeModal);
  };

  render() {
    let colors = [
      "blue",
      "red",
      "orange",
      "green",
      "yellow",
      "white",
      "black"
    ].map(color => (
      <option key={color} value={color}>
        {color}
      </option>
    ));
    const errors = this.props.errors;
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={this.ChangeHandler}
            />
          </div>
          <select
            style={{ color: this.state.color }}
            ref="dropDownColor"
            name="color"
            onChange={this.ChangeHandler}
          >
            {colors}
          </select>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors,
    author: state.rootAuthor.author
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newbook, Author, closeModal) =>
      dispatch(actionCreators.postBook(newbook, Author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
