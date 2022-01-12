import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return <article key={id} className="grocery-item row row-cols-2 row-cols-md-3">
          <p className="title col">{title}</p>
          <div className="btn-container col">
            <button className="edit-btn btn btn-outline-success btn-sm" type="button" onClick={() => editItem(id)}><FaEdit /></button>
            <button className="delete-btn btn btn-outline-danger btn-sm" type="button" onClick={() => removeItem(id)}><FaTrash /></button>
          </div>
        </article>
      })}
    </div>
  )
}

export default List;