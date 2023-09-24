import { Component } from 'react';
import { Wraper, SearchForm, Btn, Input } from './Searchbar.styled';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  onChange = evt => {
    this.setState({
      value: evt.target.value.toLowerCase(),
    });
  };

  handleOnSubmit = evt => {
    evt.preventDefault();
    if (this.state.value === '') {
      toast('Please enter a value first');
      return;
    }
    this.props.onSubmit(this.state.value.trim());
    this.setState({ value: '' });
  };

  render() {
    return (
      <Wraper>
        <SearchForm onSubmit={this.handleOnSubmit}>
          <Btn type="submit">
            <ImSearch />
          </Btn>

          <Input
            onChange={this.onChange}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.value}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Wraper>
    );
  }
}
