import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import './App.css';
import bread from './bread.png';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hello');
    if (!name) {
      //If value is empty display alert
      showAlert(true, 'Please enter an item', 'error')
    }
    else if (name && isEditing) {
      //If value has something and editing is true
    }
    else {
      //Display alert
      //Add a new item to the list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  //Show Alert Function
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type })
  }

  return (
    <div>
      <section className="section-centre">
        <img src={bread} alt="bread" />
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <h2>Grocery List</h2>
          <div className="form-control">
            <input className="grocery" type="text" placeholder="e.g. milk" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="submit-btn" type="submit">
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} />
            <button className="clear-btn">Clear Items</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
