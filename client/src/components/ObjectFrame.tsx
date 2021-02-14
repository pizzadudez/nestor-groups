import React from 'react'
import {Person, Group} from '../reducers'

interface Props {
    group?: Group | undefined;
    person?: Person | undefined;
}

export const ObjectFrame:React.FC<Props> = ({group, person}) => {
    return(
        <div style={{backgroundColor: group ? 'tomato' : 'yellow'}}>
            {group ? group.name : `${person!.first_name} ${person!.last_name}`}
        </div>
    )
}