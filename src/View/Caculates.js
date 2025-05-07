import {useState} from "react";
import { evaluate } from 'mathjs';


function Caculates() {
    const [input , setInput] = useState('');

    const Clear = () => {
        setInput('')
    }

    const Click = (value) => {
        setInput((input + value))
    }

    const handleCaculete = () => {
        try{
            let result = evaluate(input)
            setInput(result)
        } catch {
            setInput('')
        }
    }
    return (
      <div style ={styles.container}>
          <h2>Caculate</h2>
          <input type="text" value={input} readOnly style={styles.input}/>
          <div style={styles.buttonContainer}>
              {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((item, index) => (
                  <button
                      onClick={() => item === '=' ? handleCaculete() : Click(item)}
                      key={index}
                      style={styles.button}
                  >
                      {item}
                  </button>
              ))}
              <button
                  onClick={Clear}
                  style={{ ...styles.button, gridColumn: 'span 4', backgroundColor:'#DDDDDD' }}
              >
                  AC
              </button>
          </div>
      </div>

    );

}
const styles= {
    container: {
        margin : '50px auto',
        padding : '20px',
        width : '300px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
    }
    ,
    input: {
        width: '100%',
        height: '50px',
        fontSize: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor : '#FFFFCC',
    }
    ,
    buttonContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        marginTop: '20px',
        width: '100%',
        textAlign: 'center'

    }
    ,
    button: {
        width: '100%',
        height: '50px',
        fontSize: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor : '#FFA500',
        cursor : 'pointer'
    }

}
export default Caculates;