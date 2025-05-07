import {useState, useEffect} from "react";

function App() {
    const [tasks , setTasks] = useState([]);
    const [input , setInput] = useState('');
    const [filter, setFilter] = useState('All');
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (e) {
                console.error("Lỗi khi đọc dữ liệu từ localStorage:", e);
            }
        }
    }, []);
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleAdd = () => {
        const trimmed = input.trim();
        if (trimmed !== '' && !tasks.find(task => task.text === trimmed)) {
            setTasks([...tasks, { text: trimmed, completed: false }]);
            setInput('');
        }
    };

    const handleCheck = (index) => {
        setTasks(tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };
    const deleteDoneTasks = () => {
        setTasks(tasks.filter(task => !task.completed));
    };
    const deleteAllTasks = () => {
        setTasks([]);
    };
    const handleEdit = (index) => {
        const newText = prompt("Edit task:", tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            setTasks(tasks.map((task, i) =>
                i === index ? { ...task, text: newText.trim() } : task
            ));
        }
    }
    const filteredTasks = tasks.filter(task => {
        if (filter === "All") return true;
        if (filter === "Done") return task.completed;
        if (filter === "ToDo") return !task.completed;
        return true;
    });

    return (
        <div style={ {textAlign: 'center', width: '500px', margin: '0 auto'}}>
            <h2>To Do List Input</h2>
            <div style = {{
                display: "grid",gridTemplateColumns : 'repeat(1, 1fr)',
                alignItems: "center",
                gap: 8,
                background: "#f9f9f9",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                flex: 1}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{gap: 8,
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        background: "#00aabb"
                    }}
                    >
                        <span role="img" aria-label="icon">📋</span></div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="New Todo"
                        style={{ flex: 1,
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px", }}
                    />
                </div>
                <button onClick={handleAdd} style={{ padding: "8px 16px", background: "#00aabb", color: "#fff", border: "none" }}>
                    Add new task
                </button>
            </div>
            <h2>To Do List</h2>

            <div>
                {["All", "Done", "ToDo"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            width: '153px',
                            padding: "8px 16px",
                            background: filter === f ? "#007799" : "#00aabb",
                            color: "#fff",
                            marginBottom: "10px",
                            border: "1px solid",
                            borderRadius: "4px"
                        }}
                    >
                        {f}
                    </button>
                ))}
                <div
                    style={{
                    alignItems: "center",
                    gap: 8,
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}>
                    {filteredTasks.map((task, index) => (
                        <div key={index} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#fbfbfb",
                            padding: "10px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}>
                            <div style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "gray" : "black" }}>
                                {task.text}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCheck(index)}
                                />
                                <button
                                    onClick={() => handleEdit(index)}
                                    style={{ background: "#ffaa00", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px" }}
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    style={{ background: "crimson", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px" }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{  display: "flex", gap: 50, justifyContent: "center" }}>
                        <button onClick={deleteDoneTasks} style ={{ width:'225px',marginBottom: "10px", padding: "10px 20px", background: "crimson", color: "white", border: "none", borderRadius: 4}}>
                            DeleteDoneTask
                        </button>
                        <button onClick={deleteAllTasks} style = {{ width:'225px',marginBottom: "10px", padding: "10px 20px", background: "crimson", color: "white", border: "none", borderRadius: 4}} >
                            DeleteAllTask
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default App;