import React, { useState } from 'react';

function CaculateBMI() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState(null);
    const [state , setState] = useState('');

    const stateBMI = () => {
        if (!weight || !height) {
            alert('Cần phải nhập cả chiều cao và cân nặng.');
            return;
        }
        if (height <= 50) {
            setResult(null);
            alert('Chiều cao phải lớn hơn 50cm.');
            return;
        }
        const heightMeter = height / 100;
        const resultvalue = (weight / (heightMeter * heightMeter)).toFixed(1);
        setResult(resultvalue);
        setStateBMI(resultvalue);

    }

    const setStateBMI = (result) => {
        if ( result < 18.5 ) {
            setState('UnderWeight')
        } else if ( result >= 18.5 && result < 25 ) {
            setState('Normal')
        } else if ( result >= 25 && result < 30 ) {
            setState('OverWeight')
        } else {
            setState('Obese')
        }
    }
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>BMI</h2>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)} placeholder="Weight"
            />
            <br/>
            <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)} placeholder="Height"
            />
            <br/>
            <button
                onClick={stateBMI}
            >
                Calculate
            </button>
                <div>
                    { result == null  ? null :
                        <div>
                            <p>Your BMI: {result}</p>
                            <p>Category: {state}</p>
                        </div>
                    }

                </div>


        </div>

    );
}
export default CaculateBMI;