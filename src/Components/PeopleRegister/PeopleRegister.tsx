import React, { useState, useRef } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Form/Input';
import { FaPlus, FaSearch } from 'react-icons/fa';
import './PeopleRegister.css';
import MenuNav from '../Navbar/Navbar';
import Table, { tableColumn } from '../Table/Table';

const PeopleRegister = () => {
  const [state, setState] = useState<any>(
    [
      {
          "nome": "Flavia Sierro",
          "email": "flavia@teste.com",
          "profissao": "Engenharia de Software"
      },
      {
          "nome": "Nome 1",
          "email": "email1@teste.com",
          "profissao": "Profissão 1"
      },
     
  ]
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);
  
  const formRefs = {
    nome: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    profissao: useRef<HTMLInputElement>(null),
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = {
      nome: formRefs.nome.current?.value || '',
      email: formRefs.email.current?.value || '',
      profissao: formRefs.profissao.current?.value || '',
    };
    const updatedState = [...state];

    if (form.nome == "" || form.email == "" || form.profissao == "") {

      setError(() => true);
    } else {
      setError(() => false);
      // Modo de criação
      updatedState.push(form);
    //  clearFormFields();


      setState(updatedState);
      setOpenModal(true);
      setEditModal(null);
    }
    if (editModal !== null) {
      // Modo de edição
      updatedState[editModal] = form;
    }
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    setEditModal(null);
    setError(false);
  }

  const handleOpenModal = () => {
    //clearFormFields();
    setOpenModal(true);
  };

  const handleEditItem = (targetIndex: number) => {
    setEditModal(targetIndex);
    clearFormFields();
    setOpenModal(true);
  };

  const handleDeleteItem = (targetIndex: number) => {
    setState((prev: any) => prev.filter((_: any, idx: number) => idx !== targetIndex));
  };

  const clearFormFields = () => {
    if (formRefs.nome.current) formRefs.nome.current.value = '';
    if (formRefs.email.current) formRefs.email.current.value = '';
    if (formRefs.profissao.current) formRefs.profissao.current.value = '';
  };

  console.log('state', state)

  const columns: tableColumn[] = [
    {
      name: 'nome',
      header: 'Nome',
    },
    {
      name: 'email',
      header: 'Email',
    },
    {
      name: 'profissao',
      header: 'Profissão',
    },
  ];

  return (
    <>
      <MenuNav title='CADASTRO DE PESSOAS' />
      <div className=''>
        <div className='menu-container'>
          <h1>{'Menu'}</h1>
          <div className='input-button-container'>
            <input type='text' placeholder={'Buscar...'} onKeyDown={undefined} />
            <button onClick={undefined}><FaSearch /></button>
          </div>
        </div>
        <div className='container-people'>
          {editModal === null || undefined ?
            (<Modal
              isOpen={openModal}
              isClosed={handleCloseModal}
              mode={'create'}
            >
              <form onSubmit={handleFormSubmit}>
                <Input
                  type='text'
                  label='Nome'
                  id='nome'
                  placeholder='Digite seu nome'
                  ref={formRefs.nome}
                  required
                  error={error}
                />
                <Input
                  type='email'
                  label='Email'
                  id='email'
                  placeholder='Digite seu e-mail'
                  ref={formRefs.email}
                  required
                  error={error}
                />
                <Input
                  type='text'
                  label='Profissão'
                  id='profissao'
                  placeholder='Digite sua profissão'
                  ref={formRefs.profissao}
                  required
                  error={error}
                />
                <div className='btn'>
                  <button type='submit'>Ok</button>
                </div>
              </form>
            </Modal>) : (<Modal
              isOpen={openModal}
              isClosed={handleCloseModal}
              mode={'edit'}
            >
              <form onSubmit={handleFormSubmit}>
                <Input
                  type='text'
                  label='Nome'
                  id='nome'
                  placeholder='Digite seu nome'
                  ref={formRefs.nome}
                  defaultValue={state[editModal]?.nome || ''}
                  required
                />
                <Input
                  type='email'
                  label='Email'
                  id='email'
                  placeholder='Digite seu e-mail'
                  ref={formRefs.email}
                  defaultValue={state[editModal]?.email || ''}
                />
                <Input
                  type='text'
                  label='Profissão'
                  id='profissao'
                  placeholder='Digite sua profissão'
                  ref={formRefs.profissao}
                  defaultValue={state[editModal]?.profissao || ''}
                />
                <div className='btn'>
                  <button type='submit'>Ok</button>
                </div>
              </form>
            </Modal>)}

          <button type='button' className='btn-add' onClick={handleOpenModal}><FaPlus /></button>

          <Table
            deleteItem={handleDeleteItem}
            editItem={handleEditItem}
            columns={columns}
            id='table_peopleregister'
            list={state}
          />
        </div>
      </div>
    </>
  );
};

export default PeopleRegister;
