import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    text: '',
  };

  newSearch = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onSubmitForm = event => {
    event.preventDefault();
    if (this.state.text.trim() === '') {
      return alert('You want to find nothing. Please check your query');
    }

    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  };

  reset = () => {
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.Form} onSubmit={this.onSubmitForm}>
          <button type="submit" className={css.FormButton}>
            <span className={css.FormButtonLabel}>Search</span>
          </button>
          <input
            className={css.FormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="text"
            value={this.state.text}
            onChange={this.newSearch}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
