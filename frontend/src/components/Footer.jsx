import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-[#6F4D38] py-12   bg-[url('assets/footer.jpg')] sm:px-40 px-10  bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-6">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {[
            { id: "87285", link: "https://www.facebook.com/share/1AJSD8cgrU/" },
            { id: "62852", link: "https://www.youtube.com" },
            { id: "85140", link: "https://www.instagram.com/mitli777?igsh=MXVuOTBnbHh4NGl5dA==" },
            { id: "60014", link: "https://www.twitter.com" },
          ].map(({ id, link }) => (
            <a key={id} href={link} target="_blank" rel="noopener noreferrer">
              <img
                className="w-8 h-8 transition-transform transform hover:scale-125 hover:opacity-80 cursor-pointer"
                src={`https://img.icons8.com/?size=100&id=${id}&format=png&color=6F4D38`}
                alt="social icon"
              />
            </a>
          ))}
        </div>


        <div className="grid md:grid-cols-3 gap-5 text-center md:text-left">
          {/* Account Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#6F4D38]">Account</h3>
            <ul className="space-y-3 text-[#6F4D38]">
            <NavLink to="/cart"><li className=" cursor-pointer font-medium transition-colors">View Cart</li></NavLink>
              <NavLink to="/signin"><li className=" cursor-pointer font-medium transition-colors">My Account</li></NavLink>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#6F4D38]">Information</h3>
            <ul className="space-y-3 font-medium text-[#6F4D38]">
              {[
                { name: "About Us", link: "/about" },
                { name: "Contact Us", link: "/contact" },
                { name: "Privacy Policy", link: "/privacy" },
                { name: "Refund Policy", link: "/refund" },
                { name: "Customer Support", link: "/customer" },
                { name: "Shipping Policy", link: "/shipping" },
                { name: "Terms and Conditions", link: "/term" },
              ].map((item) => (
                <li key={item.name} className="cursor-pointer transition-colors">
                  <a href={item.link} className="hover:text-[#4D2F1F] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#6F4D38]">Contact Us</h3>
            <ul className="space-y-5 font-medium text-[#6F4D38]">
              <li className="flex items-center space-x-3">
                <img className="w-6 h-6 " src="https://img.icons8.com/?size=100&id=15989&format=png&color=6F4D38" alt="Location" />
                <span>Mitli Enterprises Pvt. Ltd., 44, 2nd Floor, Regal Building, Connaught Place, New Delhi - 110001, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <img className="w-6 h-6" src="https://img.icons8.com/?size=100&id=5402&format=png&color=6F4D38" alt="Phone" />
                <span> <a href="tel:+91-9717199937" className=" hover:underline"> +91-9717199937</a></span>
              </li>
              <li className="flex items-center space-x-3">
                <img className="w-6 h-6" src="https://img.icons8.com/?size=100&id=60987&format=png&color=6F4D38" alt="Email" />
                <span>
      <a href="mailto:mitli.enterprises01@gmail.com" className=" hover:underline">
        mitli.enterprises01@gmail.com
      </a>
    </span>

              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center font-medium text-[#6F4D38] text-sm border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} Mitli Enterprises Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  )
};

export default Footer;
