import React, { useEffect, useState } from 'react'

function Checkbox({checked, setChecked}) {

    const [nhanhShip, setNhanhShip] = useState(true)
    const [chamShip, setChamShip] = useState(false)

    const handleCheckBox = (e) => {
        if(checked.indexOf(e.target.value) >= 0){
            setChecked(prev => prev.filter(x => x !== e.target.value))
        } else {
            setChecked(prev => [...prev, e.target.value])
        }
    }

    useEffect(() => {
        if(nhanhShip === true) {
            setChecked(['Giao hàng nhanh'])
        }
    }, [])

    return (
        <div className="checkbox" style={{ display : 'flex' }}>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value='Giao hàng nhanh' onChange={handleCheckBox} defaultChecked='Giao hàng nhanh'/>
                <label class="form-check-label" for="inlineCheckbox1">Giao hàng nhanh</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value='Giao hàng chậm' onChange={handleCheckBox} />
                <label class="form-check-label" for="inlineCheckbox2">Giao hàng chậm</label>
            </div>
        </div>
    )
}

export default Checkbox
