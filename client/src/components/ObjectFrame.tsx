import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {Person, Group} from '../reducers'
import {selectTarget, changeGroup} from '../actions'

import Button from 'react-bootstrap/Button'

interface Props {
    group?: Group | undefined;
    person?: Person | undefined;
		disabled?: boolean;
		selected?: boolean
		selectingGroup?: boolean
}

export const ObjectFrame:React.FC<Props> = ({group, person, disabled, selected, selectingGroup}) => {
	const dispatch = useDispatch()

	const onSelectTarget = useCallback(() => {
		dispatch(selectTarget({
			type: group ? 'group' : 'person',
			id: group ? group.id : person!.id,
			belongs_to: group ? (group.belongs_to || undefined) : (person!.belongs_to || undefined)
		}))
	}, [group, person, dispatch])
	const onChangeGroup = useCallback(() => {
		if (!group) return
		dispatch(changeGroup(group.id))
	}, [group, dispatch])

  return(
    <Button
      variant={selected ? 'warning' : (group ? 'primary' : 'secondary')}
      disabled={disabled && !selected}
      value={group ? group!.id : person!.id}
      size="sm"
      style={{width: 240, margin: 1}}
      onClick={(selectingGroup && !selected) ? onChangeGroup : onSelectTarget}
    >
      {group ? group.name : `${person!.first_name} ${person!.last_name}`}
    </Button>
  )
}