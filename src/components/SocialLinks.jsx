import { Facebook, Linkedin, Viber, Telegram, Youtube } from 'lucide-react';

import React from 'react'

const SocialLinks = () => {
    const socialLinks = [
        {
          id: 1,
          icon: <Facebook className="w-6 h-6" />,  // Added className for size
          url: "https://www.facebook.com/MyJobsMyanmar",
        },
        {
          id: 2,
          icon: <Linkedin className="w-6 h-6" />,
          url: "https://www.linkedin.com/company/myjobsmyanmar/",
        },
        {
          id: 3,
          icon: <Viber className="w-6 h-6" />,
          url: "https://invite.viber.com/?g2=AQB5dKmasEkSskshfzPT9MHDsTXWrkyf6i0N4Kf82lz6%2B%2F7JOWfRKLpLLE7gvydu&lang=en",
        },
        {
          id: 4,
          icon: <Telegram className="w-6 h-6" />,
          url: "https://t.me/myjobsmyanmartelegram",
        },
        {
          id: 5,
          icon: <Youtube className="w-6 h-6" />,
          url: "https://www.youtube.com/@MyJobsMyanmarMyJobsMyanmar",
        },
      ];
    
  return (
    <div className="flex space-x-4 justify-center">
    {socialLinks.map(({ id, icon, url }) => (
      <a
        key={id}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400"
      >
        {icon}
      </a>
    ))}
  </div>
  )
}

export default SocialLinks