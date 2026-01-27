import React from 'react';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';
import ShopkeeperDashboardLayout from '../layout/ShopkeeperDashboardLayout';

export default function ContactPage() {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <ShopkeeperDashboardLayout>
        <Contact />
      </ShopkeeperDashboardLayout>
    );
  }

  return <Contact />; 
}