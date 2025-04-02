import React from 'react';

const Footer = () => {
  return (
    <footer className="text-[#6F4D38] py-12  bg-[url('assets/footer.jpg')] px-40  bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-6">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {["87285", "60014", "11101", "Iatym1CIDVkh", "Y2GfpkgYNp42"].map((id) => (
            <img
              key={id}
              className="w-8 h-8 transition-transform transform hover:scale-125 hover:opacity-80 cursor-pointer"
              src={`https://img.icons8.com/?size=100&id=${id}&format=png&color=6F4D38`}
              alt="social icon"
            />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 text-center md:text-left">
          {/* Account Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#6F4D38]">Account</h3>
            <ul className="space-y-3 text-[#6F4D38]">
              <li className=" cursor-pointer font-medium transition-colors">View Cart</li>
              <li className=" cursor-pointer font-medium transition-colors">My Account</li>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#6F4D38]">Information</h3>
            <ul className="space-y-3 font-medium text-[#6F4D38]">
              {["About Us", "Contact Us", "Privacy Policy", "Refund Policy", "Customer Support", "Shipping Policy", "Terms and Conditions"].map((item) => (
                <li key={item} className=" cursor-pointer transition-colors">{item}</li>
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
                <span>+91-9717199937</span>
              </li>
              <li className="flex items-center space-x-3">
                <img className="w-6 h-6" src="https://img.icons8.com/?size=100&id=60987&format=png&color=6F4D38" alt="Email" />
                <span>mitli.enterprises01@gmail.com</span>
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
