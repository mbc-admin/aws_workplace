import React from 'react';

import './dotQuantity.css';

const DotQuantity = ({style, size, quantity, focus}) => {

    return (
        quantity > 0 &&
        <div style={style} className={[size === 'little' && (focus) ? 'containerDotQuantityLittleFocus' : 'containerDotQuantityLittleNoFocus']}>
            {quantity}
        </div>
    )
}

export default DotQuantity;
