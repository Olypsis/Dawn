import React from 'react';
import styles from './button.css';

export const TYPES = {
	PRIMARY: 'primary',
	WARNING: 'warning',
	DANGER: 'danger',
	SUCCESS: 'success',
};

export const Button = ({ text, onClick, type, disabled, buttonType }) => (
	<button
		type={type}
		disabled={disabled}
		onClick={onClick}
		classnames={(styles.button, styles[buttonType || TYPES.PRIMARY])}
	>
		{text}
	</button>
);
	