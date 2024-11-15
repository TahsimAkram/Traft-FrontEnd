import React, { useRef, useState } from 'react'
import { Divider } from '@mui/material'
import './HomePage.css'
import Task from './Task'
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #7c7cff',
  boxShadow: 24,
  p: 4,
  borderRadius: '1em'
};

const TaskBoard = () => {
  const [open, setOpen] = useState(false);
  const taskTitle = useRef(null);
  const taskDesc = useRef(null);
  const selectedPriority = useRef('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const priorities = ['High', 'Medium', 'Low'];
  const todoTasks = [
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'High',
        'indicator': 'red'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    },
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'Medium',
        'indicator': '#e89903'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    }
  ]

  const inProgressTasks = [
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'Low',
        'indicator': '#00b000'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    },
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'High',
        'indicator': 'red'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    }

  ]

  const inReviewTasks = [
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'High',
        'indicator': 'red'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    },
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'Medium',
        'indicator': '#e89903'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    }

  ]
  const doneTasks = [
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'High',
        'indicator': 'red'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    },
    {
      'Heading': 'Concept Idea',
      'Deadline': "14 Apr",
      'PriorityDetails': {
        'priority': 'Low',
        'indicator': '#00b000'
      },
      'Desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      'Duration': '10:00 AM'
    }

  ]

  const addTask = (payload)=>{
    const jwtToken = localStorage.getItem("token");
    console.log(jwtToken);
    const header = {'Authorization':`Bearer ${jwtToken}`};
    axios.post("http://localhost:8080/task/addtask",payload,{headers:header})
    .then(response=>{
      handleClose();
    })
  }

  const mutateTask = useMutation({mutationFn:addTask})

  const openTaskPopup = () => {
    handleOpen();
  }
  const submitTaskDetails = () => {
    console.log({heading:taskTitle.current.value,description:taskDesc.current.value,priority:selectedPriority.current});
   mutateTask.mutate({heading:taskTitle.current.value,description:taskDesc.current.value,priority:selectedPriority.current});
   console.log("call made"); 
  }
  return (
    <div className='boardContainer'>
      <div className='operationBar'>
        <div className='operationHeader'>
          <p>Project Tasks</p>
          <Divider orientation="vertical" variant="middle" flexItem />
        </div>
        <div className='operations'>
          <button onClick={() => { openTaskPopup() }}><span className='createTaskDesc'><AddIcon sx={{ 'color': 'white' }} />New Task</span></button>
        </div>
      </div>
      <div className='gridContainer'>
        <div className='item'>
          <div className='itemHeading'>To do</div>
          <ul className='taskListcontainer'>
            {todoTasks.map((task, index) => <li key={index}><Task key={index} taskDetails={task} /></li>)}
          </ul>
        </div>
        <div className='item'>
          <div className='itemHeading'>In progress</div>
          <ul className='taskListcontainer'>
            {inProgressTasks.map((task, index) => <li key={index}><Task taskDetails={task} /></li>)}
          </ul>
        </div>
        <div className='item'>
          <div className='itemHeading'>In review</div>
          <ul className='taskListcontainer'>
            {inReviewTasks.map((task, index) => <li key={index}><Task taskDetails={task} /></li>)}
          </ul>
        </div>
        <div className='item'>
          <div className='itemHeading'>Done</div>
          <ul className='taskListcontainer'>
            {doneTasks.map((task, index) => <li key={index}><Task key={index} taskDetails={task} /></li>)}
          </ul>
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <h1 className='taskBoxHeader'>Add Task</h1>
              <Divider />
              <TextField inputRef={taskTitle} id="outlined-basic" label="Task Name" variant="outlined"
                sx={{
                  'width': '100%',
                  'marginTop': '1em',
                  '& .MuiFormLabel-root': {
                    color: 'rgb(177, 177, 176)',
                    width: '100%',
                    '&.Mui-focused': {
                      color: '#7c7cff', // Color when focused
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7c7cff', // Border color when focused
                      borderWidth: '2px'
                    },
                  },
                  '& .MuiInputBase-root': {
                    borderRadius: '9px'
                  }
                }}
              />
              <TextField inputRef={taskDesc} id="outlined-basic" label="Task Description" variant="outlined"
                sx={{
                  'width': '100%',
                  'marginTop': '1em',
                  'borderBottom': 'none',
                  '& .MuiFormLabel-root': {
                    color: 'rgb(177, 177, 176)',
                    width: '100%',
                    '&.Mui-focused': {
                      color: '#7c7cff', // Color when focused
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7c7cff', // Border color when focused
                      borderWidth: '2px'
                    },
                  },
                  '& .MuiInputBase-root': {
                    borderRadius: '9px'
                  }
                }} />
              <div className='priorityContainer'>
                <FormControl sx={{
                  'width': '48%',
                  'marginTop': '1em',
                  '& .MuiInputBase-root': {
                    'borderRadius': '9px'
                  }
                }}>
                  <InputLabel id="priority-label" sx={{
                    '&.MuiFormLabel-root': {
                      color: '#b3a6a6'
                    },
                    '&.Mui-focused': {
                      color: '#7c7cff',
                    },
                  }}>Priority</InputLabel>
                  <Select defaultValue=""
                    onChange={(event) => {
                      selectedPriority.current = event.target.value;
                    }}
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#7c7cff'
                      },

                    }}
                    labelId="Priority-label"
                    label="Priority"
                  >

                    {priorities.map((priority, index) => {
                      return <MenuItem key={index} sx={{
                        '&.MuiButtonBase-root': {
                          '&.MuiMenuItem-root:hover': {
                            backgroundColor: 'rgba(124, 124, 255, 0.2)',
                          },
                          '&.MuiMenuItem-root.Mui-selected:hover': {
                            backgroundColor: 'rgba(124, 124, 255, 0.5)',
                          },
                          '&.MuiMenuItem-root.Mui-selected': {
                            backgroundColor: 'rgba(124, 124, 255, 1)',
                          }
                        }
                      }} value={priority}>{priority}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                <TextField disabled variant="filled" id="outlined-basic" label="Project" defaultValue="Working on It"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    width: '48%',
                    marginTop: '1em',
                    '& .MuiFormLabel-root': {
                      color: '#434343',
                      width: '100%'
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#cdcdd1'
                    },
                    '& .MuiInputBase-root': {
                      borderRadius: '9px',
                      '&.MuiFilledInput-root.Mui-disabled::before': {
                        borderBottomStyle: 'none'
                      }
                    }
                  }}
                />
              </div>
              <div className='buttonContainer'>
                <Button onClick={submitTaskDetails} sx={{
                  '&.MuiButtonBase-root': {
                    '&.MuiButton-root:hover': {
                      backgroundColor: '#6969f7'
                    },
                    '&.MuiButton-root': {
                      backgroundColor: 'rgb(124, 124, 255)'
                    }
                  }
                }} variant="contained">Submit</Button>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default TaskBoard