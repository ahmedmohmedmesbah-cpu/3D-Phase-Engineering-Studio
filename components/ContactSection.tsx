
import React, { forwardRef } from 'react';

const ContactSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="contact-title" className="text-3xl lg:text-4xl font-bold font-heading text-text">Get In Touch</h2>
          <p className="mt-4 text-lg text-text/70">Have a project in mind? I'd love to hear from you.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-background p-8 rounded-2xl shadow-lg">
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text/80 mb-2">Name</label>
                  <input type="text" name="name" id="name" required className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-shadow" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text/80 mb-2">Email</label>
                  <input type="email" name="email" id="email" required className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-shadow" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-text/80 mb-2">Message</label>
                <textarea name="message" id="message" rows={5} required minLength={20} className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-shadow"></textarea>
              </div>
              <button type="submit" className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-opacity">
                Send Message
              </button>
            </form>
          </div>
          <div className="text-center mt-12">
            <p className="text-text/70 mb-4">Or reach out directly:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
                <a href="mailto:ahmedmohmedmesbah@gmail.com" className="font-semibold text-accent hover:underline">ahmedmohmedmesbah@gmail.com</a>
                <span className="hidden sm:inline text-border">|</span>
                <a href="https://wa.me/201002500273" className="font-semibold text-accent hover:underline">WhatsApp</a>
                 <span className="hidden sm:inline text-border">|</span>
                <a href="https://www.linkedin.com/in/ahmed-mohmedmesbah-b35901259" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;
