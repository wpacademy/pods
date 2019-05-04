import React from 'react';
import PropTypes from 'prop-types';
import { Container, Draggable } from 'react-smooth-dnd';

import './manage-fields.scss';

// WordPress dependencies
// noinspection JSUnresolvedVariable
const { __ } = wp.i18n;
const { Dashicon } = wp.components;

export const FieldList = ( props ) => {
	const containerProps = {
		groupName: 'fields',
		lockAxis: 'y',
		dragHandleSelector: '.pods-field--handle',
	};

	const handleFieldDrop = ( e ) => {
		console.log( e );
	};

	if ( 0 === props.fields.length ) {
		return (
			<Container {...containerProps} onDrop={handleFieldDrop}>
				<Draggable>
					<div className='pods-manage-fields no-fields'>
						{__( 'There are no fields in this group', 'pods' )}
					</div>
				</Draggable>
			</Container>
		);
	}

	// noinspection RequiredAttributes
	return (
		<div className='pods-manage-fields'>
			<FieldHeader />
			<Container {...containerProps} onDrop={handleFieldDrop}>
				{props.fields.map( thisField => (
					<Draggable key={thisField.id}>
						<FieldListItem
							id={thisField.id}
							fieldLabel={thisField.label}
							fieldName={thisField.name}
							required={thisField.required}
							type={thisField.type}
						/>
					</Draggable>
				) )}
			</Container>
			<FieldHeader />
		</div>
	);
};

FieldList.propTypes = {
	fields: PropTypes.array.isRequired,
};

/**
 *
 */
export const FieldListItem = ( props ) => {
	const { id, fieldName, fieldLabel, required, type } = props;

	return (
		<div className="pods-field--wrapper">
			<div className="pods-field pods-field--handle">
				<Dashicon icon='menu' />
			</div>
			<div className="pods-field pods-field--label">
				{fieldLabel}<span className={required && 'pods-field--required'}>*</span>
				<div className="pods-field--id">[id = {id}]</div>
			</div>
			<div className="pods-field pods-field--name">
				{fieldName}
			</div>
			<div className="pods-field pods-field--type">
				{type}
				<div className="pods-field--id">[type = [STILL NEED THIS]]</div>
			</div>
			<div className="pods-field pods-field--actions">
				<Dashicon icon='edit' /> <Dashicon icon='admin-page' />
				<Dashicon icon='trash' />
			</div>
		</div>
	);
};

FieldListItem.propTypes = {
	id: PropTypes.number.isRequired,
	fieldName: PropTypes.string.isRequired,
	fieldLabel: PropTypes.string.isRequired,
	required: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

/**
 *
 */
export const FieldHeader = () => {
	return (
		<div className="pods-field--wrapper-labels">
			<div className="pods-field--wrapper-label-items">Label</div>
			<div className="pods-field--wrapper-label-items">Name</div>
			<div className="pods-field--wrapper-label-items">Field Type</div>
		</div>
	);
};