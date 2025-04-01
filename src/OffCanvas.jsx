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

export const Sidebar = ({ onProfileClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '250px',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#111827" width="250px">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            SqlGPT
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Chat" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="comment">Chat</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/History" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">History</CDBSidebarMenuItem>
            </NavLink>
            {/* Use onClick instead of NavLink for Account */}
            <CDBSidebarMenuItem icon="user" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
              Account
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>
            THE GAGS
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};
