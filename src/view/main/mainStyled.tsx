import styled from "styled-components";
import {EvUI} from "ev-ui";




const Root = styled(EvUI) `
    .ant-layout{
        .ant-layout-sider{
            background:#fff;
            color:#000;
            box-shadow:1px 0 20px -5px gray;
            .ant-menu,.ant-layout-sider-trigger{
                background:transparent;
                color:#000;
            }
            .ant-menu{
                .ant-menu-item{
                    font-size:16px;
                    height:50px;
                    line-height:50px;
                    &.ant-menu-item-selected{
                        background:#009988;
                        a{
                            color:#fff;
                        }
                    }
                }
            }
            .logo{
                border-radius: 50%;
                padding: 16px;
                transition:all .5s;
                overflow:hidden;
                text-align:center;
                img{
                    border-radius:50%;
                    max-width:100px;
                    max-height:100px;
                    width:100%;
                    height:100%;
                }
            }
            &.ant-layout-sider-collapsed{
                .ant-menu.ant-menu-sub{
                    background:#333;
                }
            }
            .ant-layout-sider-collapsed .anticon {
                font-size: 16px;
                margin-left: 8px;
            }
            
            .ant-layout-sider-collapsed .nav-text {
                display: none;
            }
            
            .ant-layout-sider-collapsed .ant-menu-submenu-vertical > .ant-menu-submenu-title:after {
                display: none;
            }
        }
        
        &>.ant-layout{
            overflow:auto;
            background:transparent;
            .ant-layout-header{
                display:flex;
                align-items:center;
                background-color:#fff;
                box-shadow:0 1px 10px -4px gray;
                line-height:normal;
                .placeholder{
                    flex-grow:1;
                }
                .user-info{
                    .user,.group{
                        padding:0 5px;
                    }
                }
            }
            .main-content{
                margin:10px;
                background: transparent;
                display:flex;
                flex-direction:column;
            }
        }
    }
`;

export default Root;