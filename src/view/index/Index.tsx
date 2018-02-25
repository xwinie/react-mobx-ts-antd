import  React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {Button, message} from "antd";


const Root = styled.div`
    flex-grow:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .btn-group{
        display:flex;
        align-items:center;
        justify-content:center;
        .btn{
            margin:10px;
        }
    }
`


@observer
export default class Index extends React.Component<any, any> {

    render() {
        return (
            <Root>
                <div className="btn-group">
                    <Button className='btn' type='ghost'
                            onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                    <Button className='btn' type='primary'
                            onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                </div>
                <div className="btn-group">
                    <Button className='btn' type='dashed'
                            onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                    <Button className='btn' type='danger'
                            onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                </div>
            </Root>
        )
    }
}