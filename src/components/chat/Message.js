import React from 'react';
import PropTypes from 'prop-types';


function Message(props) {
  const { text } = props;
  return (
    <div id="message" className="card">
      <div className="cell large-4">
        {text}
      </div>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;