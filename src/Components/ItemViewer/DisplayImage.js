import React from 'react'
import {Link} from 'react-router-dom'
import SkeletonLoading from 'Components/SkeletonLoading/SkeletonLoading'
export default function DisplayImage({img,alt}) {
 
    return (
        <div className="DisplayImage">
            <Link className="Link" to="/">&#xab; Return Home</Link>
           {img? <img src={img} alt={alt} />:<SkeletonLoading/>}
        </div>
    )
}
