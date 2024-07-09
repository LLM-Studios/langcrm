import React from 'react';
import Head from 'next/head';

const Imprint = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>LangCRM - Imprint</title>
        <meta name="description" content="Imprint for LLM Studios GmbH" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Imprint</h1>

      <p className="mb-4">Last updated: 9th of July 2024</p>

      <section className="mb-6">
        <p>LLM Studios GmbH</p>
        <p>Rheinsberger Str. 76/77</p>
        <p>c/o Factory Works GmbH</p>
        <p>10115 Berlin</p>
        <p>Germany</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Commercial Register</h2>
        <p>HRB 262062 B</p>
        <p>Register Court: Amtsgericht Charlottenburg</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Represented by</h2>
        <p>Leo Schoberwalter</p>
        <p>Matteo von Haxthausen</p>
        <p>Leonard Off</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Contact</h2>
        <p>Phone: +491759669996</p>
        <p>Email: sales@llmstudios.de</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Editorially Responsible</h2>
        <p>Leonard Off</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Consumer Dispute Resolution</h2>
        <p>
          We are not willing or obligated to participate in dispute resolution 
          proceedings before a consumer arbitration board.
        </p>
      </section>
    </div>
  );
};

export default Imprint;