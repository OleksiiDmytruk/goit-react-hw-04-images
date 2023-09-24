import { useState } from 'react';
import { Wraper, SearchForm, Btn, Input } from './Searchbar.styled';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const onChange = evt => {
    setValue(evt.target.value.toLowerCase());
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    if (value === '') {
      toast('Please enter a value first');
      return;
    }
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <Wraper>
      <SearchForm onSubmit={handleOnSubmit}>
        <Btn type="submit">
          <ImSearch />
        </Btn>

        <Input
          onChange={onChange}
          type="text"
          autoComplete="off"
          autoFocus
          value={value}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Wraper>
  );
};
