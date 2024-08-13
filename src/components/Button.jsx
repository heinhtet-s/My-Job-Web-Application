import React from 'react';
import { Button } from '@/components/ui/button'; 

const DynamicButton = ({ isActive, onClick, label, Icon }) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center ${isActive ? 'bg-[#F69322]' : 'bg-gray-300'} rounded-lg`}
    >
      <span className={`mr-2 ${isActive ? 'text-white' : 'text-gray-400'}`}>{label}</span>
      <Icon className={`${isActive ? 'text-white' : 'text-gray-500'}`} />
    </Button>
  );
};

export default DynamicButton;
