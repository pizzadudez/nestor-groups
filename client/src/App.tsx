import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from './actions';
import {ObjectFrame} from './components/ObjectFrame'
import { State, Group } from './reducers'

function App() {
  const dispatch = useDispatch()
  const { groups, groupsById, personsById } = useSelector((state: State) => state)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const rootGroups = groups.filter((group: Group) => group.belongs_to === null)

  const renderGroup = (group: Group) => (
    <>
    <ObjectFrame group={group} />
    {group.persons ? 
      <div style={{paddingLeft: '20px'}}>
        {group.persons.map((id: number) => (
          <ObjectFrame person={personsById[id]} />
        ))}
      </div>
      : undefined}
    {group.subgroups ?
      <div style={{paddingLeft: '20px'}}>
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
