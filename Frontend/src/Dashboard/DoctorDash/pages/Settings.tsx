import { useState } from 'react';
import { User, CreditCard, Lock, Bell } from 'lucide-react';
import React from 'react';

const settingsNav = [
  { name: 'Account Details', icon: User, section: 'account' },
  { name: 'Billing Information', icon: CreditCard, section: 'billing' },
  { name: 'Change Password', icon: Lock, section: 'password' },
  { name: 'Delete Account', icon: Bell, section: 'Delete' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');

  return (
    <div className="flex flex-col overflow-y-auto gap-5 md:flex-row  p-6">
      <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Settings Nav</h2>
        <ul className=' text-nowrap'>
          {settingsNav.map((item) => (
            <li
              key={item.section}
              className={`mb-4 px-4 py-2 text-sm font-medium rounded flex items-center cursor-pointer ${
                activeSection === item.section ? 'bg-blue-500 text-white' : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveSection(item.section)}
            >
              <item.icon className="mr-4" /> 
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-6 bg-white shadow-lg rounded-lg">
        {activeSection === 'billing' && <BillingInformation />}
        {activeSection === 'password' && <ChangePassword />}
        {activeSection === 'Delete' && <DeleteAccount />}
      </div>
    </div>
  );
}

function BillingInformation() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Account Name *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address *</label>
          <input type="email" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
          <input type="tel" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Zip *</label>
          <input type="text" className="w-full p-2 rounded bg-white text-black border" />
        </div>
      </div>
    </div>
  );
}

function ChangePassword() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
      <div className='flex flex-col gap-y-4'>
        <div>
          <label className="block text-sm font-medium text-gray-700">Old Password *</label>
          <input type="password" placeholder='Old Password' className="w-full p-2 rounded bg-white text-black border focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password *</label>
          <input type="password" placeholder='New Password' className="w-full p-2 rounded bg-white text-black border focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
          <input type="password" placeholder='Confirm Password' className="w-full p-2 rounded bg-white text-black border focus:outline-none focus:ring-2" />
        </div>
      </div>
      <button type="submit" className="w-1/2 md:w-auto mt-5 bg-blue-500 text-white px-3 py-2 rounded-lg">Save Password</button>
    </div>
  );
}

function DeleteAccount() {
  return (
    <>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h2>
      <div className="pt-6 flex items-start justify-center">
        <div className="flex flex-col space-y-4 min-w-screen animated fadeIn faster">
          <div className="flex flex-col p-8 bg-red-200 shadow-md hover:shadow-lg rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 rounded p-3 border border-red-800 text-gray-100 bg-red-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div className="flex flex-col ml-3">
                  <div className="font-medium leading-none text-red-500">Delete Your Account?</div>
                  <p className="text-sm text-gray-500 leading-none mt-1">By deleting your account, you will lose all your data.</p>
                </div>
              </div>
              <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
