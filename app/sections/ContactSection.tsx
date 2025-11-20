import React from "react";
import { ElegantContactForm } from "../components/ElegantContactForm";

const ContactSection: React.FC = () => {
  return (
    <div id="contact-section" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-12 mb-4 sm:mb-6">
          Get In Touch
        </h2>
        <p className="text-sm sm:text-base text-gray-9 mb-6 sm:mb-8">
          Have a project in mind or want to collaborate? Let&apos;s talk.
        </p>
      </div>

      <ElegantContactForm />
    </div>
  );
};

export default ContactSection;
