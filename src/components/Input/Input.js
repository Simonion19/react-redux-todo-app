import React from 'react';
import { connect } from 'react-redux';

import './Input.scss';

const Input = props => {
  return (
    <input className='tasks__input' type='text' placeholder='Добавьте задачу' onKeyDown={
      (event) => {
        if (event.keyCode === 13) {
          if (event.target.value === '') alert('Заполните поле ввода задачи!')
          else {
            props.addTask(props.dirId, event.target.value);
            event.target.value = '';
          }
        }
        
      }
    }
    style={{display: (props.isHidden ? 'none' : 'block')}}
    />
  )
}

function mapStateToProps(state) {
  let [ dir ] = state.dirs.filter(dir => dir.isActive === true);
  let dirId = dir !== undefined ? dir.id : null
  return {
    dirId: dirId,
    isHidden: dirId === null ? true : false
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTask: (dirId, text) => dispatch(
      {
        type: 'ADD_TASK',
        dirId: dirId,
        text: text
      }
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);