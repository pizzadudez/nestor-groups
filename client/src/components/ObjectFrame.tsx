import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {Person, Group} from '../reducers'
import {selectTarget, changeGroup} from '../actions'

import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

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
		dispatch(selectTarget(group ? group! : person!))
	}, [group, person, dispatch])
	const onChangeGroup = useCallback(() => {
		if (!group) return
		dispatch(changeGroup(group.id))
	}, [group, dispatch])

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Info</Popover.Title>
      <Popover.Content>
        <pre>
          {JSON.stringify(group ? group : person, null, 2)}
        </pre>
      </Popover.Content>
    </Popover>
  );

  return(
    <div style={{display: 'flex'}}>
      <Button
          variant={selected ? 'success' : (group ? 'primary' : 'warning')}
          disabled={disabled && !selected}
          value={group ? group!.id : person!.id}
          size="sm"
          style={{width: 240, margin: 1}}
          onClick={(selectingGroup && !selected) ? onChangeGroup : onSelectTarget}
        >
          {group ? group.name : `<${person!.job_title}> ${person!.first_name} ${person!.last_name} `}
        </Button>
      {selected && <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button
          variant="info"
          size="sm"
          // style={{position: 'absolute', top: 0, right: 0}}
        >
          Info
        </Button>
      </OverlayTrigger>}
    </div>
  )
}