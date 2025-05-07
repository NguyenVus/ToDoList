import {useState} from "react";

 function App() {
     const [tasks , setTasks] = useState([])
     const [input , setInput] = useState('')

     const handleAdd = () => {
         if (input.trim() !== '' && !tasks.includes(input.trim())) {
             setTasks([...tasks , {text: input , completed: false}])
             setInput('')
         }
     }
     const handleCheck = (index) => {
        setTasks(tasks.map((task , i) => i === index ? {...task , completed: !task.completed} : task))
     }

     const handleDelete = (index) => {
         setTasks(tasks.filter((task , i) => i !== index))
     }
  return (
    <div style={ {textAlign: 'center'}}>
       <h1>To Do List</h1>
        <input
            type="text"
            value={input}
            placeholder = 'Add Task'
            onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd} style={ {marginLeft:'20px'}}>Add</button>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
            <thead>
            <tr>
                <th>STT</th>
                <th>Công việc</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
            </thead>
            <tbody>
            {tasks.length === 0 ? (
                <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>Không có công việc nào</td>
                </tr>
            ) : (
                tasks.map((task, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </td>
                        <td>{task.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</td>
                        <td>
                            <button onClick={() => handleCheck(index)}>
                                {task.completed ? 'Hoàn tác' : 'Hoàn thành'}
                            </button>
                            <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}>Xoá</button>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    </div>
  );
 }
 export default App;