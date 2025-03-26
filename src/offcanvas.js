import React from 'react';
import {
CDBSidebar,
CDBSidebarContent,
CDBSidebarFooter,
CDBSidebarHeader,
CDBSidebarMenu,
CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
return (
<div
style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
>
<CDBSidebar textColor="#fff" backgroundColor="#333">
<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
<a
href="/"
className="text-decoration-none"
style={{ color: 'inherit' }}
>
SqlGPT
</a>
</CDBSidebarHeader>
<CDBSidebarContent className="sidebar-content">
<CDBSidebarMenu>
<NavLink exact to="/" activeClassName="activeClicked">
<CDBSidebarMenuItem icon="comment">Chat</CDBSidebarMenuItem>
</NavLink>
<NavLink exact to="/tables" activeClassName="activeClicked">
<CDBSidebarMenuItem icon="table">History</CDBSidebarMenuItem>
</NavLink>
<NavLink exact to="/profile" activeClassName="activeClicked">
<CDBSidebarMenuItem icon="user">Account</CDBSidebarMenuItem>
</NavLink>


</CDBSidebarMenu>
</CDBSidebarContent>
<CDBSidebarFooter style={{ textAlign: 'center' }}>
<div
style={{
padding: '20px 5px',
}}
>
THE GAGS
</div>
</CDBSidebarFooter>
</CDBSidebar>
</div>
);
};
export default Sidebar;