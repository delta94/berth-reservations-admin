import React from 'react';
import { Button as HDSButton } from 'hds-react';
import { ButtonProps } from 'hds-react/lib';

// HDS Button component with 'coat' theme by default
const Button = (props: ButtonProps) => <HDSButton theme="coat" {...props} />;

export default Button;
