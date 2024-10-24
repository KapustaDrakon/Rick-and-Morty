import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';

export const Filter = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');

  const {
    setApiURL,
    activePage,
    setActivePage,
    changePage,
    setChangePage
  } = useData();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeStatus = (e) => {
    if (e.target.value === 'all') return setStatus('');
    setStatus(e.target.value);
  };

  const onChangeSpecies = (e) => {
    setSpecies(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangeGender = (e) => {
    if (e.target.value === 'all') return setGender('');
    setGender(e.target.value);
  };

  const getURLParams = () => {
    let currentURL = window.location;
    if (currentURL.search) {
      let nameParam = '';
      let statusParam = '';
      let speciesParam = '';
      let typeParam = '';
      let genderParam = '';
      let pageParam = '';
      let currentURLSearch = currentURL.search.slice(1).split('&');

      for (let i = 0; i < currentURLSearch.length; i++) {
        if (currentURLSearch[i].includes('name=')) {
          setName(currentURLSearch[i].slice(5));
          nameParam = currentURLSearch[i].slice(5);
        }

        if (currentURLSearch[i].includes('status=')) {
          statusParam = currentURLSearch[i].slice(7);
          if (statusParam === 'all') {
            statusParam = '';
            setStatus('');
          } else setStatus(currentURLSearch[i].slice(7));
        }

        if (currentURLSearch[i].includes('species=')) {
          setSpecies(currentURLSearch[i].slice(8));
          speciesParam = currentURLSearch[i].slice(8);
        }

        if (currentURLSearch[i].includes('type=')) {
          setType(currentURLSearch[i].slice(5));
          typeParam = currentURLSearch[i].slice(5);
        }

        if (currentURLSearch[i].includes('gender=')) {
          genderParam = currentURLSearch[i].slice(7);
          if (genderParam === 'all') {
            genderParam = '';
            setGender('');
          } else setGender(currentURLSearch[i].slice(7));
        }

        if (changePage) {
          window.history.pushState(
            null,
            null,
            params(name, status, species, type, gender, activePage + 1)
          );
          setChangePage(false);
        }
        if (currentURLSearch[i].includes('page=')) {
          pageParam = currentURLSearch[i].slice(5);

          if (Number(pageParam) !== activePage + 1) {
            setActivePage(Number(pageParam) - 1);
          }
        }
      }

      console.log(
        name,
        status,
        species,
        type,
        gender,
        ' / ',
        nameParam,
        statusParam,
        speciesParam,
        typeParam,
        genderParam
      );

      setApiURL(
        `https://rickandmortyapi.com/api/character/${params(
          nameParam,
          statusParam,
          speciesParam,
          typeParam,
          genderParam,
          activePage + 1
        )}`
      );
    }
  };

  const params = (name, status, species, type, gender, page) =>
    `${name || status || species || type || gender || page ? '?' : ''}${
      name ? 'name=' + name : ''
    }${name && status ? '&' : ''}${status ? 'status=' + status : ''}${
      (name || status) && species ? '&' : ''
    }${species ? 'species=' + species : ''}${
      (name || status || species) && type ? '&' : ''
    }${type ? 'type=' + type : ''}${
      (name || status || species || type) && gender ? '&' : ''
    }${gender ? 'gender=' + gender : ''}${
      (name || status || species || type || gender) && page ? '&' : ''
    }${page ? 'page=' + page : ''}`;

  useEffect(() => {
    setTimeout(() => getURLParams(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const onSubmit = (e) => {
    console.log(name);
    e.preventDefault();
    window.history.pushState(
      null,
      null,
      params(name, status, species, type, gender, 1)
    );
    setApiURL(
      `https://rickandmortyapi.com/api/character/${params(
        name,
        status,
        species,
        type,
        gender,
        1
      )}`
    );
    setActivePage(0);
  };

  return (
    <Container>
      Filter
      <Form onSubmit={onSubmit}>
        <Label htmlFor="filter_name">
          Name
          <Input
            type="text"
            id="filter_name"
            onChange={onChangeName}
            defaultValue={name}
          />
        </Label>

        <Label htmlFor="filter_status">
          Status
          <Select id="filter_status" onChange={onChangeStatus} value={status}>
            <option>all</option>
            <option>alive</option>
            <option>dead</option>
            <option>unknown</option>
          </Select>
        </Label>

        <Label htmlFor="filter_species">
          Species
          <Input
            type="text"
            id="filter_species"
            onChange={onChangeSpecies}
            defaultValue={species}
          />
        </Label>

        <Label htmlFor="filter_type">
          Type
          <Input
            type="text"
            id="filter_type"
            onChange={onChangeType}
            defaultValue={type}
          />
        </Label>

        <Label htmlFor="filter_gender">
          Gender
          <Select id="filter_gender" onChange={onChangeGender} value={gender}>
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
