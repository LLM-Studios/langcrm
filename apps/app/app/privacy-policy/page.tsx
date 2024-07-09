import React from 'react';
import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>LangCRM - Privacy Policy</title>
        <meta name="description" content="Privacy Policy for LangCRM" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Last updated: 9th of July 2024</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p>
          LLM Studios GmbH ("we", "us", or "our") operates the LangCRM service (the "Service"). 
          This page informs you of our policies regarding the collection, use, and disclosure 
          of personal data when you use our Service and the choices you have associated with that data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Data Controller Contact Information</h2>
        <p>LLM Studios GmbH</p>
        <p>Rheinsberger Str. 76/77</p>
        <p>c/o Factory Works GmbH</p>
        <p>10115 Berlin</p>
        <p>Email: sales@llmstudios.de</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Types of Data Collected</h2>
        <p>We collect and process the following types of personal data:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Account Information: Your email address when you create an account.</li>
          <li>User-Submitted Data: Any data you choose to submit to our Service for analysis, including conversational data.</li>
          <li>Log Data: We automatically collect information that your browser sends whenever you use our Service.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Purposes of Data Processing</h2>
        <p>We use the collected data for various purposes:</p>
        <ul className="list-disc list-inside ml-4">
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>To generate insights from the conversational data you submit</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Legal Bases for Processing</h2>
        <p>We process your personal data under the following legal bases:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Performance of a Contract: The processing is necessary for the performance of a contract to which you are party or in order to take steps at your request prior to entering into a contract.</li>
          <li>Legitimate Interests: The processing is necessary for our legitimate interests or the legitimate interests of a third party, except where such interests are overridden by your interests or fundamental rights and freedoms which require protection of personal data.</li>
          <li>Consent: You have given consent to the processing of your personal data for one or more specific purposes.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Recipients of Personal Data</h2>
        <p>We may share your personal data with the following categories of recipients:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Cloud Service Providers: We use cloud services to host our infrastructure and store data.</li>
          <li>Hosting Providers: Our service is hosted on servers provided by third-party hosting companies.</li>
          <li>Logging Services: We use third-party services for logging and monitoring our application performance.</li>
        </ul>
        <p>These service providers act as our data processors and are obligated to process the data solely for the purposes of providing their services to us. We have agreements in place to ensure they process your data in compliance with this privacy policy and applicable data protection laws.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Data Retention</h2>
        <p>We retain your personal data indefinitely. This allows us to provide you with continuous service and to improve our offerings based on historical data. However, you have the right to request deletion of your data at any time (see "Your Rights" below).</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Your Rights</h2>
        <p>Under the General Data Protection Regulation (GDPR) and other applicable data protection laws, you have certain rights regarding your personal data:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Right to Access: You have the right to request a copy of the personal data we hold about you.</li>
          <li>Right to Rectification: You have the right to request that we correct any inaccurate personal data we hold about you.</li>
          <li>Right to Erasure: You have the right to request that we delete your personal data under certain circumstances.</li>
          <li>Right to Restrict Processing: You have the right to request that we restrict the processing of your personal data under certain circumstances.</li>
          <li>Right to Data Portability: You have the right to request that we transfer your personal data to another controller under certain circumstances.</li>
          <li>Right to Object: You have the right to object to our processing of your personal data under certain circumstances.</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the contact information provided in Section 2. We will respond to your request in accordance with applicable data protection laws.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">9. Right to Lodge a Complaint</h2>
        <p>You have the right to lodge a complaint with a supervisory authority if you believe that our processing of your personal data infringes upon data protection laws. In Germany, the competent supervisory authority is:</p>
        <p>[Name and contact details of the relevant German data protection authority]</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">10. International Data Transfers</h2>
        <p>Our operations are conducted within the European Economic Area (EEA). However, some of our service providers may be located outside the EEA. In such cases, we ensure that adequate safeguards are in place to protect your personal data, such as Standard Contractual Clauses approved by the European Commission.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">11. Automated Decision-Making and Profiling</h2>
        <p>LangCRM does not engage in automated decision-making or profiling practices that would produce legal effects concerning you or similarly significantly affect you.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">12. Security Measures</h2>
        <p>We are committed to protecting your personal data. We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Database protection: We use secure database systems with access controls to protect your data.</li>
          <li>API endpoint protection: Our API endpoints are secured to prevent unauthorized access.</li>
        </ul>
        <p>While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security. No method of transmission over the Internet or method of electronic storage is 100% secure.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">13. Use of Cookies</h2>
        <p>We use cookies only for storing login credentials. Cookies are files with small amount of data which may include an anonymous unique identifier. These are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">14. Third-Party Services</h2>
        <p>We use the following third-party services that may collect and process data:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Vercel: For hosting and deployment</li>
          <li>Supabase: For database management</li>
          <li>PostHog: For analytics and user behavior tracking</li>
          <li>Langfuse: For language model monitoring and analytics</li>
        </ul>
        <p>These services may collect and process personal data as per their own privacy policies. We encourage you to review the privacy policies of these third-party services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">15. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by sending an email to the email address you have provided to us. You are advised to review this Privacy Policy periodically for any changes.</p>
        <p>Changes to this Privacy Policy are effective when they are posted on this page and we have notified you via email.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">16. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <p>By email: mvh@llmstudios.de</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;