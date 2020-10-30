import React from 'react';
import './Notifications.css'

/**
 * This is very basic notification system that renders 1 notification at a time to display auth errors
 * you are expected to replace the notification logic for a more feature complete version,
 * you may need a system that has a global state for messages and have different actions dispatching
 * to a central notification system
 *  */
function Notification({text, type, id}) {
return (<div id={`${type}-${id}`} className={`notification ${type}`}>
  <div>{text}</div>
  {id ? <div className="code">{id}</div> : null}
</div>)
}

function Notifications({messages}) {
  if(!messages.length) return null;

  return <div>
    {messages.map(msg => <Notification key={msg.id} {...msg} />)}
  </div>;

}
export default Notifications
