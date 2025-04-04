import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">Refund & Cancellation Policy</h1>
      <p className="text-center text-gray-600">Mitli Enterprise Private Limited</p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">1. Return Window</h2>
        <p><span className="font-semibold">Duration:</span> Returns are accepted within 7 days of receiving the product.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">2. Eligibility Criteria</h2>
        <p>To be eligible for a return, the item must meet the following conditions:</p>
        <ul className="list-disc list-inside mt-2">
          <li><span className="font-semibold">Condition:</span> The item must be unused and in its original packaging.</li>
          <li><span className="font-semibold">Tags and Labels:</span> All tags, labels, and receipts must be included.</li>
          <li><span className="font-semibold">Expiry Date:</span> The expiry date of the product should be at least 30 days from the return request date.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">3. Exceptions</h2>
        <p>The following items are non-returnable:</p>
        <ul className="list-disc list-inside mt-2">
          <li><span className="font-semibold">Opened or Spoiled Products:</span> Any food or beverage that has been opened or shows signs of spoilage.</li>
          <li><span className="font-semibold">Damaged Items:</span> Products damaged due to misuse will not be accepted for return.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">4. Return Process</h2>
        <p>To initiate a return, please follow these steps:</p>
        <ul className="list-decimal list-inside mt-2">
          <li><span className="font-semibold">Login:</span> Access the “My Orders” section on our website.</li>
          <li><span className="font-semibold">Request:</span> Select the item you wish to return and provide the reason for the return.</li>
          <li><span className="font-semibold">Evidence:</span> Upload supporting evidence (photos or videos) if necessary.</li>
          <li><span className="font-semibold">Pickup:</span> Our team will arrange for return pickup.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">5. Inspection and Approval</h2>
        <ul className="list-disc list-inside mt-2">
          <li>All returns will undergo quality control inspection upon receipt.</li>
          <li>Products that do not meet eligibility criteria will be rejected and returned to the customer.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">6. Refund Process</h2>
        <p>If approved, all refunds will be credited to the original payment method within 7 to 10 business days.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">7. Customer Support</h2>
        <p>For further assistance, our customer support team is available 24/7:</p>
        <ul className="mt-2">
          <li><span className="font-semibold">Email:</span> info@mitli.in</li>
          <li><span className="font-semibold">Phone:</span> +91 9717199937</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">8. Legal Rights</h2>
        <ul className="list-disc list-inside mt-2">
          <li>This return policy does not affect your statutory rights.</li>
          <li>The company’s decision is final in all disputes related to returns.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">9. Policy Updates</h2>
        <p>Please check our website regularly for any updates or amendments to our return policy.</p>
      </section>
    </div>
    </div>
  );
};

export default RefundPolicy;
