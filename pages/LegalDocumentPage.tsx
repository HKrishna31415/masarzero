import React from 'react';
import { Link, useParams } from 'react-router-dom';

const documents = {
  terms: {
    title: 'Terms of Service',
    updated: 'Updated April 16, 2026',
    sections: [
      {
        heading: '1. Scope',
        body:
          'These terms govern access to MasarZero websites, software, hardware telemetry, reports, and support services. Use of the platform constitutes acceptance of these terms.',
      },
      {
        heading: '2. Permitted Use',
        body:
          'Clients may use MasarZero materials and systems only for lawful operational, compliance, engineering, and commercial purposes related to their engagement with MasarZero.',
      },
      {
        heading: '3. Intellectual Property',
        body:
          'All product designs, software workflows, visualizations, technical files, and underlying methods remain the property of MasarZero or its licensors unless otherwise agreed in writing.',
      },
      {
        heading: '4. Service Availability',
        body:
          'MasarZero may maintain, improve, suspend, or replace portions of the platform and support services as needed to preserve safety, reliability, security, and regulatory compliance.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Updated April 16, 2026',
    sections: [
      {
        heading: '1. Operational Data',
        body:
          'We collect machine telemetry, performance indicators, alarms, support records, and reporting metadata necessary to operate systems, support clients, and generate compliance outputs.',
      },
      {
        heading: '2. Business Information',
        body:
          'We collect contact and account information provided by clients for onboarding, support coordination, billing, contracting, and service delivery.',
      },
      {
        heading: '3. Security Controls',
        body:
          'Data is protected through role-based access, transport encryption, secure storage controls, and logging practices appropriate to industrial operations workflows.',
      },
      {
        heading: '4. Retention',
        body:
          'Records are retained only as long as needed for contractual, support, legal, technical, and compliance purposes.',
      },
    ],
  },
  compliance: {
    title: 'Regulatory Compliance',
    updated: 'Updated April 16, 2026',
    sections: [
      {
        heading: '1. Frameworks',
        body:
          'MasarZero aligns system design and deployment documentation with applicable local and international standards, including hazardous-area requirements and environmental reporting obligations.',
      },
      {
        heading: '2. Documentation',
        body:
          'Clients receive supporting documentation for commissioning, inspections, testing, and applicable audit or submission workflows.',
      },
      {
        heading: '3. Certification Pathways',
        body:
          'MasarZero works with testing, inspection, and certification partners to document product performance and readiness across relevant jurisdictions.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'Updated April 16, 2026',
    sections: [
      {
        heading: '1. Essential Cookies',
        body:
          'We use essential cookies to support navigation, session handling, and security across the website.',
      },
      {
        heading: '2. Analytics',
        body:
          'Privacy-respecting analytics may be used to improve site experience and understand content usage. We do not use advertising trackers on this site.',
      },
      {
        heading: '3. Choices',
        body:
          'Browser-level settings can limit or block cookies, though doing so may affect some website functionality.',
      },
    ],
  },
} as const;

const LegalDocumentPage: React.FC = () => {
  const { documentId } = useParams();
  const doc = documentId ? documents[documentId as keyof typeof documents] : undefined;

  if (!doc) {
    return (
      <section className="min-h-screen bg-white text-slate-900 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Document not found</h1>
          <p className="text-slate-600 mb-8">The legal document you requested is not available.</p>
          <Link to="/legal" className="text-blue-700 font-semibold">
            Return to Legal Center
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white text-slate-900 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <Link to="/legal" className="text-blue-700 font-semibold">
            Back to Legal Center
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-3">{doc.title}</h1>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{doc.updated}</p>
        </div>

        <div className="space-y-10 leading-8 text-slate-700">
          {doc.sections.map(section => (
            <article key={section.heading}>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalDocumentPage;
