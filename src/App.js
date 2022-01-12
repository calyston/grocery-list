import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import './style.css';
import bread from './bread.png';
import { Button, Container, Col, Row } from 'react-bootstrap';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hello');
    if (!name) {
      //If value is empty display alert
      showAlert(true, 'Please enter an item.', 'error');
    }
    else if (name && isEditing) {
      //If value has something and editing is true
      setList(list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name }
        }
        return item
      }));
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'Item updated!', 'success')
    }
    else {
      //If something has been inputted display alert
      showAlert(true, 'Item added to list!', 'success');
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

  //Clear List
  const clearList = () => {
    setName('');
    setEditID(null);
    setIsEditing(false);
    showAlert(true, 'List cleared!', 'error');
    setList([]);
  }

  //Remove Item
  const removeItem = (id) => {
    showAlert(true, 'Item removed from list!', 'error');
    setList(list.filter((item) => item.id !== id));
  }

  //Edit Item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  //Save to Local Storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  return (
    <div>
      < section className="section-centre" >
        <img src={bread} alt="bread" />
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h2>Grocery List</h2>
          <div className="input-group row">
            <input className="grocery form-control" type="text" placeholder="e.g. milk" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="submit-btn btn btn-success col-auto" type="submit">
              {isEditing ? 'Edit' : 'Submit'}
            </button>
          </div>
        </form>
        {
          list.length > 0 && (
            <div className="grocery-container">
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className="clear-btn btn btn-danger" onClick={clearList}>Clear Items</button>
            </div>
          )
        }
      </section >
    </div >
  );
}

export default App;
