// import React from 'react'

// export default function CartCounter({count}) {
//     return (
   
//             <div id='cart'>Cart<div className="cart-count">{count}</div></div>
        
//     )
// }

import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    
   
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function CartCounter({count}) {
  return (
   

<StyledBadge badgeContent={count} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>

    
      
  
  );
}