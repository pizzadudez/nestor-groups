
import React, {} from 'react';

import {Formik, Field} from 'formik'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface Props {
	initialValues: object
	isGroup: boolean
	submitHandler: (data: object) => void
	handleClose: () => void
}

export const MyForm:React.FC<Props> = ({initialValues,submitHandler, isGroup, handleClose}) => {
		
    return (
			<Formik
				initialValues={initialValues}
				onSubmit={submitHandler}
			>
				{({ values, handleSubmit }) => (
				<>
					<Modal.Body>
						{isGroup ? (<>
							<h3>Group name</h3>
							<Field name="name" label="Group name" />
						</>) : (<>
							<h3>First name</h3>
							<Field name="first_name" label="Group name" />
							<h3>Last name</h3>
							<Field name="last_name" label="Group name" />
							<h3>Job title</h3>
							<Field name="job_title" label="Group name" />
						</>)}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleSubmit as any}>
							Save Changes
						</Button>
					</Modal.Footer>
				</>
				)}
			</Formik>
    )
}