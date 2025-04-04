import React from "react";

const CustomerSupport = () => {
  return (
    <div  className="bg-gradient-to-b from-blue-50 to-white">
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Customer Support
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Welcome to the Customer Support section of <strong>www.mitli.in</strong>. We are here to assist you with any questions or issues you may encounter.
        </p>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
          <p className="text-gray-600 mb-2"><strong>Email Support:</strong> <a href="mailto:info@mitli.in" className="text-blue-600 hover:underline">info@mitli.in</a></p>
          <p className="text-gray-600">We aim to respond within 2 business days.</p>
          <p className="text-gray-600 mt-2"><strong>Phone Support:</strong> 9717199937</p>
          <p className="text-gray-600">Available: Monday to Friday, 9 AM - 6 PM IST</p>
        </div>

        {/* FAQs */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Frequently Asked Questions (FAQs)</h2>
          <p className="text-gray-600">Before contacting us, you may find answers in our <a href="#" className="text-blue-600 hover:underline">FAQ section</a>. Topics include:</p>
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            <li>Account setup</li>
            <li>Payment issues</li>
            <li>Troubleshooting common problems</li>
            <li>Software features</li>
          </ul>
        </div>

        {/* Support Ticket System */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Support Ticket System</h2>
          <p className="text-gray-600">For detailed assistance, submit a ticket through our <a href="#" className="text-blue-600 hover:underline">Support Ticket page</a>. You will receive a ticket number to track your request.</p>
        </div>

        {/* Feedback and Complaints */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Feedback and Complaints</h2>
          <p className="text-gray-600">We value your feedback! Share your suggestions or complaints at <a href="mailto:feedback@mitli.in" className="text-blue-600 hover:underline">feedback@mitli.in</a>. Your concerns are important to us.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CustomerSupport;
