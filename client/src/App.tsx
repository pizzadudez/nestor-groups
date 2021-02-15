import React, {useEffect, useMemo, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

import {StyledModal} from './components/StyledModal'

import { fetchData } from './actions';
import {ObjectFrame} from './components/ObjectFrame'
import { State, Group, Person } from './reducers'

function App() {
  const dispatch = useDispatch()
  const { selected, selectedType, groups, persons, groupsById, personsById } = useSelector((state: State) => state)

  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [type, setType] = useState('person')

  // Compute wether group can be moved inside another group
  const isInvalidGroup = useMemo(() => {
    const hashTable: any = {}
    if (selectedType === 'person') return hashTable

    const group = {...(selected as Group)}
    if (group.belongs_to) { hashTable[group!.belongs_to] = true }

    const hashSubgroups = (ids: number[]) => {
      ids.forEach(id => {
        hashTable[id] = true
        hashSubgroups(groupsById[id].subgroups || [])
      })
    }
    hashSubgroups(group.subgroups || [])
    
    return hashTable
  }, [selected, selectedType, groupsById])

  const handleClose = () => setShow(false);
  const handleNewPerson = () => {
    setShow(true);
    setType('person')
    setIsUpdate(false);
  }
  const handleNewGroup = () => {
    setShow(true);
    setType('group')
    setIsUpdate(false);
  }
  const handleEdit = () => {
    setShow(true);
    setIsUpdate(true);
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const rootGroups = groups.filter((group: Group) => group.belongs_to === null)
  const rootPersons = persons.filter((person: Person) => person.belongs_to === null)
  const renderGroup = (group: Group) => (
    <>
    <ObjectFrame
      key={'group' + group.id}
      group={group}
      selected={selectedType === 'group' && selected!.id === group.id}
      selectingGroup={selected && !!selected!.id}
      disabled={selectedType === 'group' && isInvalidGroup[group.id]}
      // disabled={
      //   selected && (selected!.belongs_to === group.id ||
      //   (selectedType === 'group' && !!selected!.id
      //   && (groupsById[selected!.id].level < group.level || selected!.id === group.id)))
      // }
    />
    {group.persons ? 
      <div style={{marginLeft: '40px', display: 'flex', flexDirection: 'column', maxWidth: 350}}>
        {group.persons.map((id: number) => (
          <ObjectFrame
            key={'person' + id}
            person={personsById[id]}
            selected={selectedType === 'person' && selected!.id === id}
            disabled={selected && !!selected!.id}
            selectingGroup={selected && !!selected!.id}
          />
        ))}
      </div>
      : undefined}
    {group.subgroups ?
      <div style={{marginLeft: '40px', display: 'flex', flexDirection: 'column', maxWidth: 450}}>
        {group.subgroups.map((id: number) => renderGroup(groupsById[id]))}
      </div>
      : undefined
    }
    </>
  )

  return (
    <div style={{display: 'flex', flexDirection: 'column', maxWidth: 500}}>
      <Button onClick={handleNewPerson}>New Person</Button>
      <Button onClick={handleNewGroup}>New Group</Button>
      <Button 
        onClick={handleEdit}
        disabled={!selected}
      >
        Edit
      </Button>
      <StyledModal 
        show={show}
        handleClose={handleClose}
        isUpdate={isUpdate}
        type={isUpdate ? selectedType : type}
        initialValues={isUpdate ? selected : undefined}
        />
      {rootPersons.map((person: Person) => (
        <ObjectFrame
          key={'person' + person.id}
          person={person}
          selected={selectedType === 'person' && selected!.id === person.id}
          disabled={selected && !!selected!.id}
          selectingGroup={selected && !!selected!.id}
        />
      ))}
      {rootGroups.map((group: Group) => renderGroup(group))}
    </div>
  );
}

export default App;
