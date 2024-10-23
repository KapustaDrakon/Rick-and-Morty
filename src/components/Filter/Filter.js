import { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';

export const Filter = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');

  const { setApiURL, characters } = useData();
  console.log(characters);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onChangeSpecies = (e) => {
    setSpecies(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setApiURL(
      `https://rickandmortyapi.com/api/character/?name${'=' + name}
      &status${'=' + status}
      &species${'=' + species}
      &type${'=' + type}
      &gender${'=' + gender}`
    );
  };

  return (
    <Container>
      Filter
      <Form onSubmit={onSubmit}>
        <Label htmlFor="filter_name">
          Name
          <Input type="text" id="filter_name" onChange={onChangeName} />
        </Label>

        <Label htmlFor="filter_status">
          Status
          <Select id="filter_status" onChange={onChangeStatus}>
            <option>all</option>
            <option>alive</option>
            <option>dead</option>
            <option>unknown</option>
          </Select>
        </Label>

        <Label htmlFor="filter_species">
          Species
          <Input type="text" id="filter_species" onChange={onChangeSpecies} />
        </Label>

        <Label htmlFor="filter_type">
          Type
          <Input type="text" id="filter_type" onChange={onChangeType} />
        </Label>

        <Label htmlFor="filter_gender">
          Gender
          <Select id="filter_gender" onChange={onChangeGender}>
            <option>all</option>
            <option>female</option>
            <option>male</option>
            <option>genderless</option>
            <option>unknown</option>
          </Select>
        </Label>

        <Button type="submit">Search</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const Input = styled.input`
  margin-left: 10px;
  border: none;
  outline: none;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  font-size: 20px;
`;
const Select = styled.select`
  margin-left: 10px;
  border: none;
  height: 40px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  font-size: 20px;
`;
const Button = styled.button`
  border: none;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  font-size: 20px;
  background-color: #dbdbdb;

  &:hover {
    background-color: #029c78;
    color: #2bd900;
    cursor: pointer;
  }
`;
const Label = styled.label`
  margin: 10px;
  font-weight: normal;
  font-size: 20px;
`;
