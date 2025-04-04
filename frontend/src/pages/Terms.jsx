import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 ">
      <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions</h1>
      <p className="text-gray-700 text-sm text-center mb-6">Last updated: 23/12/2024</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mt-2">
          By accessing or using Our Software, you agree to comply with and be bound by these Terms and Conditions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Changes to Terms</h2>
        <p className="text-gray-600 mt-2">
          We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective
          immediately upon posting the revised terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 text-gray-600 mt-2">
          <li>Harassing, threatening, or causing distress to any person</li>
          <li>Transmitting obscene or offensive content</li>
          <li>Gaining unauthorized access to other computer systems</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">4. Intellectual Property Rights</h2>
        <p className="text-gray-600 mt-2">
          All content, trademarks, and other intellectual property rights in Our Software are owned by or licensed to us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
        <p className="text-gray-600 mt-2">
          We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of Our Software.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">6. Third-Party Links</h2>
        <p className="text-gray-600 mt-2">
          Our Software may contain links to third-party websites. We do not endorse or assume responsibility for their content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">7. Governing Law</h2>
        <p className="text-gray-600 mt-2">
          These Terms and Conditions shall be governed by the laws of India. Any disputes shall be subject to the courts in New Delhi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">8. Contact Us</h2>
        <p className="text-gray-600 mt-2">If you have any questions, contact us:</p>
        <ul className="text-gray-600 mt-2">
          <li>Email: info@mitli.in</li>
          <li>Phone: 9717199937</li>
          <li>Address: 44, 2nd Floor, Regal Building, Connaught Place, New Delhi - 110001, India</li>
        </ul>
      </section>
    </div>
    
  );
};

export default Terms;
