import React from 'react';
import PropTypes from 'prop-types';

const sizeClasses = {
  small: 'text-sm p-1 uppercase text-center',
  medium: 'text-base px-3 py-2 font-medium',
  large: 'text-lg px-6 py-3 font-medium',
};

const Button = ({
  children,
  size,
  backgroundColor,
  textColor,
  hoverBackgroundColor,
  className,
  ...props
}) => {
  let buttonClasses = `rounded-sm w-full shadow-sm ${sizeClasses[size]} ${backgroundColor} ${textColor} ${className}`;
  if (hoverBackgroundColor) {
    buttonClasses += ` hover:${hoverBackgroundColor}`;
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  size: 'medium',
  backgroundColor: 'bg-colorBluePrimary',
  textColor: 'text-white',
  className: '',
};

export default Button;
