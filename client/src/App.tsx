import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'

import { fetchData } from './actions';
import {ObjectFrame} from './components/ObjectFrame'
import { State, Group } from './reducers'

function App() {
  const dispatch = useDispatch()
  const { selection, groups, groupsById, personsById } = useSelector((state: State) => state)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const rootGroups = groups.filter((group: Group) => group.belongs_to === null)

  const renderGroup = (group: Group) => (
    <>
    <ObjectFrame 
      group={group}
      selected={selection.type === 'group' && selection.id === group.id}
      disabled={
        selection.belongs_to === group.id ||
        (selection.type === 'group' && !!selection.id
        && (groupsById[selection!.id].level < group.level || selection.id === group.id))
      }
      selectingGroup={!!selection.id}
    />
    {group.persons ? 
      <div style={{marginLeft: '40px', display: 'flex', flexDirection: 'column', maxWidth: 250}}>
        {group.persons.map((id: number) => (
          <ObjectFrame 
            person={personsById[id]}
            selected={selection.type === 'person' && selection.id === id}
            disabled={!!selection.id}
            selectingGroup={!!selection.id}
          />
        ))}
      </div>
      : undefined}
    {group.subgroups ?
      <div style={{marginLeft: '40px', display: 'flex', flexDirection: 'column', maxWidth: 250}}>
        {group.subgroups.map((id: number) => renderGroup(groupsById[id]))}
      </div>
      : undefined
    }
    </>
  )

  return (
    <>
    {rootGroups.map((group: Group) => renderGroup(group))}
    </>
  );
}

export default App;
