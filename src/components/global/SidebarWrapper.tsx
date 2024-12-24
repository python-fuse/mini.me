'use client';

import { SidebarProvider } from '../../contexts/SidebarContext';
import Sidebar from './Sidebar';

const SidebarWrapper = () => {
  return (
    <SidebarProvider>
      <Sidebar />
    </SidebarProvider>
  );
};
export default SidebarWrapper;
