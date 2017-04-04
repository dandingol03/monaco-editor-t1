
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect} from 'react-redux'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
// import {
//     loginNpmShell
// } from '../../actions/customizeActions';
//
// import {
//     onNpmLogged
// } from '../../actions/npmActions';

class NpmLoginModalButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowingModal: props.isShowingModal?props.isShowingModal:false,
        }
    }



    handleClose = () => {
        this.setState({isShowingModal: false});
        if(this.props.onClose)
            this.props.onClose();
    }

    handleOK=(val)=>{
        this.setState({isShowingModal:false});
        if(this.props.onClose)
            this.props.onClose();
        if(this.props.onConfirm)
            this.props.onConfirm(this.input.value);
    }

    handleTest=()=>{
        var payload={
            username:this.username.value,
            password:this.password.value,
            email:this.email.value,
            path:'/users/danding/Documents/WebstormProj/electron-rn-dnd/preview/src/App',
            dirname:'tmp'
        }
        this.props.dispatch(loginNpmShell(payload)).then((payload)=>{
            var {data}=payload;
            var low=data.toString().toLowerCase();
            if(low.indexOf('incorrect')!=-1||low.indexOf('err')!=-1)
            {
                this.setState({report:'login failed'});
            }
            else{
                this.setState({report:'logged in as '+username});
                this.props.dispatch(onNpmLogged({username:username,password:password}));
            }

        }).catch((e)=>{
            alert(e);
        })
    }

    handleCancel=()=>{
        //TODO:make this unvisible
        this.setState({isShowingModal:false});
        if(this.props.onCancel)
            this.props.onCancel();
        if(this.props.onClose)
            this.props.onClose();
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.state.isShowingModal!=nextProps.isShowingModal)
            this.setState(nextProps);
    }

    render() {

        const style = _.extend({
            fontSize: '11px',
            position: 'relative',
            width: '60px',
            alignItems: 'center',
            WebkitAppRegion: 'no-drag',
        }, _.cloneDeep(this.props.style))



        return <span>
        {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
                <ModalDialog onClose={this.handleClose} className='custom-modal' style={{padding:0,borderRadius:0,backgroundColor:'transparent'}}>
                    <div style={{display:'flex',flex:1,width:500,flexDirection:'column'}}>


                        <span style={{display:'flex',flex:1,alignItems:'center',backgroundColor:'#ddd',height:22,
                            borderTopLeftRadius:4,borderTopRightRadius:4}}>
                            <span style={{width:43,display:'flex',padding:4,justifyContent:'center'}}
                                  onClick={this.handleClose}
                            >
                                <span style={{display:'flex',width:16,height:16,borderRadius:8,backgroundColor:'#F91BB3',
                                    alignContent:'center'}}>
                                    <span style={{color:'#ddd',display:'flex',fontSize:11,flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <i className='fa fa-times'></i>
                                    </span>
                                </span>
                            </span>
                            <span style={{color:'#555',fontSize:'0.8em',flex:1,display:'flex',flexDirection:'row'
                                ,justifyContent:'center'}}>Npm Login</span>
                            <span style={{display:'flex',width:40}}>

                            </span>
                        </span>



                        <span style={{display:'flex',flex:1,backgroundColor:'#333',borderBottomLeftRadius:4,
                            borderBottomRightRadius:4,padding:12,paddingLeft:20,paddingRight:20,flexDirection:'column'}}>


                            <span style={{flex:1,marginTop:14,flexDirection:'row',display:'flex',alignItems:'center'}}>
                                <span style={{color:'#aaa',alignItems:'center',justifyContent:'center',width:90}}>
                                    Login :
                                </span>

                                <input type="text" style={{fontSize:16,flex:1,borderRadius:4,borderWidth:0,color:'#ddd',
                                    backgroundColor:'rgba(140,140,140,0.2)',paddingLeft:6,paddingRight:6}}
                                       ref={(o)=>{
                                           this.username=o;
                                       }}/>
                            </span>


                            <span style={{flex:1,marginTop:14,flexDirection:'row',display:'flex',alignItems:'center'}}>
                                <span style={{color:'#aaa',alignItems:'center',justifyContent:'center',width:90}}>
                                    Password :
                                </span>

                                <input type="password" style={{fontSize:16,flex:1,borderRadius:4,borderWidth:0,color:'#ddd',
                                    backgroundColor:'rgba(140,140,140,0.2)',paddingLeft:6,paddingRight:6}}
                                       ref={(o)=>{
                                           this.password=o;
                                       }}/>
                            </span>

                            <span style={{flex:1,marginTop:14,flexDirection:'row',display:'flex',alignItems:'center'}}>
                                <span style={{color:'#aaa',alignItems:'center',justifyContent:'center',width:90}}>
                                    Email :
                                </span>

                                <input type="text" style={{fontSize:16,flex:1,borderRadius:4,borderWidth:0,color:'#ddd',
                                    backgroundColor:'rgba(140,140,140,0.2)',paddingLeft:6,paddingRight:6}}
                                       ref={(o)=>{
                                           this.email=o;
                                       }}/>
                            </span>

                            <span style={{flex:1,marginTop:14,justifyContent:'flex-end',display:'flex'}}>
                                {/*test button*/}
                                <span style={{width:70,borderRadius:3,marginRight:10,backgroundColor:'#555',alignItems:'center',
                                    justifyContent:'center',display:'flex'}} onClick={this.handleTest}>
                                    <span style={{color:'#ccc',fontSize:13}}>Test</span>
                                </span>
                            </span>

                            <span style={{flex:1,marginTop:14,justifyContent:'flex-end',display:'flex',height:1,backgroundColor:'#777'}}>
                            </span>

                            <span style={{flex:1,display:'flex',whiteSpace:'normal',color:'#7cd9ff',fontSize:12}}>
                                {this.state.report}
                            </span>

                            <span style={{flex:1,marginTop:14,justifyContent:'flex-end',display:'flex'}}>
                                {/*cancel button*/}
                                <span style={{width:70,borderRadius:3,marginRight:10,backgroundColor:'#555',alignItems:'center',
                                    justifyContent:'center',display:'flex'}} onCancel={this.handleCancel}>
                                    <span style={{color:'#ccc',fontSize:13}}>Cancel</span>
                                </span>

                                {/*ok button*/}
                                <span style={{width:70,borderRadius:3,backgroundColor:'rgba(51, 133, 255, 0.35)',alignItems:'center',
                                    justifyContent:'center',display:'flex'}} onClick={this.handleOK}>
                                    <span style={{color:'#ccc',fontSize:13}}>OK</span>
                                </span>

                            </span>

                        </span>


                    </div>



                </ModalDialog>
            </ModalContainer>
        }
        </span>;
    }

}


export default connect()(NpmLoginModalButton)

