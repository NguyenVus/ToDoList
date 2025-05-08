import {useState, useEffect} from "react";


function App() {
    const [tasks , setTasks] = useState([]);
    const [input , setInput] = useState('');
    const [filter, setFilter] = useState('All');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

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
        } else {
            localStorage.removeItem("tasks");
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
        localStorage.clear();
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(tasks[index].text);
    };

    const handleSaveEdit = (index) => {
        if (editText.trim() !== '') {
            setTasks(tasks.map((task, i) =>
                i === index ? { ...task, text: editText.trim() } : task
            ));
        }
        setEditIndex(null);
        setEditText('');
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "All") return true;
        if (filter === "Done") return task.completed;
        if (filter === "ToDo") return !task.completed;
        return true;
    });

    return (
        <div style={{
            textAlign: 'center',
            width: '400px',
            padding: '0 30px',
            paddingBottom:'40px',
            margin: '0 auto',
            border:'.5px solid #ccc'}}
        >
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
                <div style={{
                    display: "flex",
                    alignItems: "center" }}>
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
                        style={{
                            flex: 1,
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px", }}
                    />
                </div>
                <button
                    onClick={handleAdd}
                    style={{
                        padding: "8px 16px",
                        background: "#00aabb",
                        color: "#fff", border: "none",
                        cursor:"pointer" }}
                >
                    Add new task
                </button>
            </div>
            <h2>To Do List</h2>

            <div>
                <div style = {{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)", // 3 cột, mỗi cột chia đều
                    gap: 8,
                    marginBottom: "10px"}}>
                    {["All", "Done", "ToDo"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                width: 'auto',
                                padding: "8px 16px",
                                background: filter === f ? "#007799" : "#00aabb",
                                color: "#fff",
                                marginBottom: "10px",
                                border: "1px solid",
                                borderRadius: "4px",
                                 cursor: "pointer"
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

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
                            alignItems: "left",
                            background: "#fbfbfb",
                            padding: "15px",
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}>
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => handleSaveEdit(index)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSaveEdit(index);
                                    }}
                                    autoFocus
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        fontSize: "14px" }}
                                />
                            ) : (
                                <div
                                    style={{
                                        textDecoration: task.completed ? "line-through" : "none",
                                        color: task.completed ? "gray" : "black",
                                        overflowX: "auto",
                                        whiteSpace: "nowrap",
                                        maxWidth: "auto",
                                        textAlign: "left",
                                        scrollbarWidth: "none",
                                        msOverflowStyle: "none",
                                        padding: "10px",
                                    }}
                                >
                                    {task.text}
                                </div>
                            )}

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10 }}
                            >
                                <input
                                    type="checkbox"
                                    style={{ marginLeft: "10px" }}
                                    value='checked'
                                    checked={task.completed}
                                    onChange={() => handleCheck(index)}
                                />
                                <button
                                    onClick={() => handleEdit(index)}
                                    style={{ background: "#ffaa00", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px", cursor: "pointer" }}
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    style={{ background: "crimson", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px" ,cursor: "pointer" }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{
                        display: "flex",
                        gap: 50,
                        justifyContent: "center" }}
                    >
                        <button
                            onClick={deleteDoneTasks}
                            style ={{
                                width:'225px',
                                marginBottom: "10px",
                                padding: "10px 20px",
                                background: "crimson",
                                color: "white",
                                border: "none",
                                borderRadius: 4,
                                cursor: "pointer" }}>
                            DeleteDoneTask
                        </button>
                        <button
                            onClick={deleteAllTasks}
                            style = {{
                                width:'225px',
                                marginBottom: "10px",
                                padding: "10px 20px",
                                background: "crimson",
                                color: "white",
                                border: "none",
                                borderRadius: 4,
                                cursor: "pointer"}} >
                            DeleteAllTask
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default App;