import React, { Component, } from 'react'
import DraggableListItem from './DraggableListItem';
class List extends Component {

    render() {

        var {data}=this.props;
        var lis=[];
        data.map((item,i)=>{
            lis.push(<DraggableListItem item={item} key={i}/>)
        });


        return (
            <div style={{width:'100%',height:'100%'}}>
                <ul style={{listStyle:'none'}}>
                    {lis}
                </ul>
            </div>
        )
    }
}

module.exports=List
