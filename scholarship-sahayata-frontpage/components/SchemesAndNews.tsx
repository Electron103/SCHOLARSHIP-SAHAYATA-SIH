// src/components/SchemesAndNews.tsx

import React from 'react';
import {
  Calendar,
  ArrowRight,
  ExternalLink,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { SCHEMES, NEWS_ITEMS, DICTIONARY } from '../constants';
import { LanguageCode } from '../types';
import jsPDF from 'jspdf';

interface Props {
  currentLang: LanguageCode;
  onNavigate: (path: string) => void;
}

type NewsItem = (typeof NEWS_ITEMS)[number];

/* ---------- detailed on-screen content for each news ---------- */

const renderNewsContent = (news: NewsItem) => {
  const title = news.title;
  const t = title.toLowerCase();
  const eventDate = news.date; // e.g. "12 Dec 2025"

  /* 1) Applications open – Post-Matric Scholarship 2025–26 */
  if (t.includes('post-matric')) {
    return (
      <>
        {/* MAIN BODY */}
        <section className="mb-6">
          {/* We don't repeat the big heading because the page already shows news.title */}
          <p className="text-gray-700 leading-relaxed">
            The Government hereby announces that the application process for the{' '}
            <strong>Post-Matric Scholarship Scheme for the academic year 2025–26</strong> is now
            officially open. Students pursuing studies at the post-matriculation level in recognised
            educational institutions across the country are invited to submit their applications
            within the notified time frame. This scheme forms a key component of the Government’s
            broader educational development agenda and aims to ensure that every eligible learner
            receives adequate support to continue their academic pursuits without interruption.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            The opening of the application window reflects the Government’s consistent commitment to
            promoting inclusive education and expanding opportunities for learners belonging to
            scheduled, backward, minority, and economically weaker communities. Each year, the
            scheme reaches millions of students nationwide, helping reduce the financial burden
            associated with continued education. The Government emphasizes the importance of timely
            submission of applications so that the verification and approval processes can be
            undertaken smoothly by the respective institutions and authorities.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Furthermore, institutions have been instructed to carry out verification of academic and
            community-related credentials strictly as per the guidelines. This step ensures
            transparency and helps maintain the integrity of the scheme. Students are advised to
            carefully review their academic records and institutional details before applying, as
            the verification process depends heavily on accurate information being furnished. The
            Government expects full cooperation from both institutions and students to ensure that
            the benefits of the scheme reach the intended candidates in a fair and efficient manner.
          </p>
        </section>

        {/* ELIGIBILITY CRITERIA */}
        <section className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Eligibility Criteria
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 leading-relaxed">
            <li>
              Applicants must belong to the{' '}
              <em>SC / ST / OBC / Minority / EWS</em> categories as per Government norms.
            </li>
            <li>
              Must be enrolled in <em>Class 11, Class 12, Undergraduate, Postgraduate, or
              higher-level programmes</em>.
            </li>
            <li>
              Annual family income must fall within the category-specific limits prescribed by the
              Government.
            </li>
            <li>Must be pursuing studies in a recognised educational institution.</li>
          </ul>
        </section>
      </>
    );
  }

  /* 2) New DBT guidelines released for associated banks */
  if (t.includes('dbt') || t.includes('guideline')) {
    return (
      <>
        {/* MAIN BODY */}
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            The Government has issued comprehensive revised guidelines pertaining to the{' '}
            <strong>Direct Benefit Transfer (DBT)</strong> system to all associated banks and
            financial institutions. These updated guidelines have been formulated after extensive
            review and assessment of existing DBT processes, with the objective of enhancing
            efficiency, accountability, and transparency across all beneficiary-related financial
            transactions. The DBT system plays a pivotal role in ensuring that funds under
            Government schemes are transferred directly to the bank accounts of eligible recipients
            in a timely and error-free manner.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            The revised guidelines underscore the necessity of strengthening account authentication
            processes. Banks have been directed to ensure accurate seeding of Aadhaar numbers with
            beneficiary accounts, proper validation of account status, and prompt resolution of
            discrepancies. The Government has emphasized that even minor lapses in account
            verification can lead to delays or rejections, affecting the beneficiaries. Therefore,
            institutions are instructed to adopt improved digital processes and systematic
            monitoring to eliminate such issues.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Additionally, the Government has highlighted the importance of coordination between
            banks, national payment gateways, and scheme-implementing agencies to minimise
            transaction failures. Banks are required to submit periodic reports indicating
            compliance with the revised guidelines and to ensure timely completion of all technical
            and operational updates. These measures aim to fortify the DBT infrastructure and
            improve service delivery standards for beneficiaries across the country.
          </p>
        </section>

        {/* KEY POINTS */}
        <section className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Key Points
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 leading-relaxed">
            <li>Strengthened procedures for Aadhaar authentication and account validation.</li>
            <li>Updated mechanisms to ensure timely credit of Government-provided funds.</li>
            <li>
              Improved coordination between banks and national-level payment systems.
            </li>
            <li>
              Enhanced accountability and reporting requirements for associated institutions.
            </li>
          </ul>
        </section>
      </>
    );
  }

  /* 3) Awareness camp scheduled in Varanasi regarding PM-AJAY */
  if (t.includes('pm-ajay') || t.includes('varanasi')) {
    return (
      <>
        {/* MAIN BODY */}
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            The Government hereby informs that an official awareness camp under the{' '}
            <strong>Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY)</strong> will be held
            in Varanasi to provide in-depth information and guidance to members of the eligible
            communities. The awareness camp is being organised with the objective of ensuring that
            citizens have access to authentic, accurate, and comprehensive information regarding the
            scheme’s components. This initiative is part of the Government’s ongoing efforts to
            increase outreach and enhance community participation in centrally administered welfare
            programmes.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            During the event, trained resource personnel and Government representatives will
            interact with stakeholders, explain the operational framework of the scheme, and respond
            to queries raised by the participants. The camp will also facilitate discussions on the
            importance of socio-economic development, the role of community engagement, and
            Government initiatives aimed at supporting the upliftment of underrepresented groups.
            Through this initiative, the Government seeks to bridge information gaps and encourage
            more individuals to understand and utilise the provisions of PM-AJAY.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            The awareness programme is expected to attract students, parents, community leaders, and
            representatives from various local bodies. The Government recognises that such camps
            play a vital role in ensuring that welfare measures reach the grassroots effectively. By
            providing direct access to officials and creating a platform for open communication, the
            camp aims to strengthen public trust and improve the overall implementation of the
            scheme in the district.
          </p>
        </section>

        {/* KEY POINTS */}
        <section className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Key Points
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 leading-relaxed">
            <li>Government-organised camp to disseminate scheme-related information.</li>
            <li>
              Interaction with officials for clarification of queries and procedures.
            </li>
            <li>Focus on community outreach and stakeholder engagement.</li>
            <li>
              Designed to improve awareness and accessibility of PM-AJAY provisions.
            </li>
          </ul>
        </section>
      </>
    );
  }

  /* 4) Last date extended – National Overseas Scholarship */
  if (t.includes('overseas')) {
    return (
      <>
        {/* MAIN BODY */}
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            The Government hereby announces the extension of the last date for submission of
            applications under the <strong>National Overseas Scholarship Scheme</strong>. This
            decision has been taken in consideration of the large number of applicants who have
            sought additional time to complete university admission processes and compile necessary
            documentation. The extension is intended to provide fair opportunity to all eligible
            candidates who aspire to pursue higher education abroad under this prestigious Government
            initiative.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            The National Overseas Scholarship Scheme provides an important avenue for students
            belonging to specified categories to pursue postgraduate, doctoral, and research-based
            studies in internationally recognised institutions. With a growing number of students
            applying for overseas education each year, the extension of the deadline ensures that no
            meritorious applicant is deprived of the opportunity due to administrative constraints.
            Applicants are advised to adhere to the newly extended timeline and ensure that the
            details furnished in their applications meet all the prescribed criteria.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            The Government has reiterated its commitment to supporting academic excellence and
            promoting global exposure for deserving candidates. Institutions responsible for
            processing and verifying applications have been directed to continue their operations
            without interruption during the extended period. The Government encourages all
            prospective applicants to utilise this opportunity and complete the application process
            in a timely and responsible manner.
          </p>
        </section>

        {/* ELIGIBILITY CRITERIA */}
        <section className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Eligibility Criteria
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 leading-relaxed">
            <li>
              Applicant must belong to an eligible category such as{' '}
              <em>SC, EBC, DNT</em>, or other notified groups.
            </li>
            <li>
              Must secure an admission offer or confirmation letter from a recognised foreign
              university.
            </li>
            <li>
              Must fulfil the minimum academic performance requirements as per scheme norms.
            </li>
            <li>
              Annual family income must not exceed the Government-prescribed limit.
            </li>
          </ul>
        </section>
      </>
    );
  }

  /* 5) SMILE scheme beneficiaries reach new milestone – improved content */
  if (t.includes('smile')) {
    return (
      <>
        {/* OVERVIEW */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Overview of the SMILE Scheme
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The <strong>SMILE Scheme (Support for Marginalized Individuals for Livelihood and Enterprise)</strong>{' '}
            is a major initiative of the Government of India under the Ministry of Social Justice and Empowerment.
            It aims to rehabilitate and empower two highly vulnerable groups –{' '}
            <strong>persons engaged in begging</strong> and <strong>transgender persons</strong> – by providing
            comprehensive support, social inclusion and sustainable livelihood opportunities.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            The scheme ensures access to <strong>shelter homes, healthcare, counselling, identity documentation,
            skill development and financial independence</strong>. Through a combination of rescue, rehabilitation
            and livelihood generation, SMILE helps beneficiaries move towards a life of dignity and self-reliance.
          </p>
        </section>

        {/* KEY OBJECTIVES */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Key Objectives
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 leading-relaxed">
            <li>Restore dignity and promote social inclusion of marginalized individuals.</li>
            <li>Provide shelter, food, healthcare, counselling and rehabilitation support.</li>
            <li>Enable skill development and link beneficiaries to suitable livelihood options.</li>
            <li>Reduce stigma through awareness, legal aid and community participation.</li>
            <li>Support long-term empowerment through entrepreneurship and employment opportunities.</li>
          </ul>
        </section>

        {/* MAJOR COMPONENTS */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Major Components of the Scheme
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 leading-relaxed">
            <li>
              <strong>Rehabilitation Support:</strong> Rescue operations, shelter homes, food, clothing, identity
              documents and psycho-social counselling.
            </li>
            <li>
              <strong>Skill Training & Job Placement:</strong> Vocational training, certification and placement
              support under schemes such as PM-DAKSH and other livelihood programmes.
            </li>
            <li>
              <strong>Garima Greh Homes:</strong> Dedicated shelter homes for transgender persons offering housing,
              legal aid, health services and capacity-building.
            </li>
            <li>
              <strong>Entrepreneurship & Financial Inclusion:</strong> Guidance for starting small businesses and
              linkages with bank credit, Mudra loans and other self-employment schemes.
            </li>
            <li>
              <strong>Community Sensitisation:</strong> Awareness campaigns to reduce discrimination and encourage
              acceptance in families, workplaces and institutions.
            </li>
          </ul>
        </section>

        {/* BENEFITS TABLE */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Benefits at a Glance
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">Identity Support</td>
                  <td className="border p-2">Aadhaar, identity cards, documentation and legal assistance</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Health Care</td>
                  <td className="border p-2">Regular health check-ups, therapy and medical support</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Skill Development</td>
                  <td className="border p-2">Vocational training, workshops and certified courses</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Livelihood Support</td>
                  <td className="border p-2">Job placement, business setup guidance and loan assistance</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Social Rehabilitation</td>
                  <td className="border p-2">Shelter, counselling and support for social reintegration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* HOW TO AVAIL */}
        <section className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How to Avail Benefits
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Eligible individuals, NGOs and institutions can approach their{' '}
            <strong>State Social Welfare Department</strong>, <strong>District Rehabilitation Centres</strong> or
            nearby <strong>Garima Greh</strong> facilities for information and support. Detailed guidelines and
            scheme documents are available on the official website of the Ministry of Social Justice and
            Empowerment at{' '}
            <a
              href="https://socialjustice.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tiranga-blue hover:text-tiranga-saffron underline"
            >
              https://socialjustice.gov.in
            </a>
            .
          </p>
        </section>
      </>
    );
  }

  /* 6) Default generic content */
  return (
    <section className="mb-2">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Details
      </h2>
      <p className="text-gray-700 leading-relaxed">
        This news item is part of the ongoing initiatives of the Ministry of
        Social Justice and Empowerment to promote awareness, transparency and
        timely delivery of benefits through DBT-enabled and welfare schemes.
        Beneficiaries are advised to refer to the detailed notification and
        official portals for complete information.
      </p>
    </section>
  );
};

/* ---------- helper: plain-text content for ONE-PAGE PDF ---------- */

const getNewsPdfContent = (news: NewsItem): string => {
  const title = news.title;
  const t = title.toLowerCase();
  const eventDate = news.date;

  if (t.includes('post-matric')) {
    return (
      'Post-Matric Scholarship – Information Note\n\n' +
      `This note relates to the Post-Matric Scholarship announcement around ${eventDate}. The scheme of the Ministry of Social Justice and Empowerment provides financial assistance to eligible students from disadvantaged communities pursuing post-matric level studies. It covers admissible tuition fees, examination fees and a maintenance allowance and is implemented through Direct Benefit Transfer (DBT) directly into the student’s bank account.\n\n` +
      'Students are advised to submit their applications within the notified time frame and ensure that all academic, category and bank details are correctly furnished as per the guidelines. Institutions have been instructed to carry out verification in a transparent manner so that benefits reach genuinely eligible candidates.'
    );
  }

  if (t.includes('dbt') || t.includes('guideline')) {
    return (
      'Revised DBT Guidelines for Scholarship Payments – Information Note\n\n' +
      `This document summarises the revised Direct Benefit Transfer (DBT) guidelines issued by the Ministry of Social Justice and Empowerment for associated banks around ${eventDate}. The aim is to make scholarship disbursement faster, more reliable and transparent so that eligible students receive their scholarship amounts directly in their bank accounts without delay.\n\n` +
      'Under the guidelines, banks must ensure that beneficiary accounts are Aadhaar-seeded and active, treat scholarship credits as priority transactions and promptly resolve failed payments. Banks are also required to strengthen coordination with payment gateways and scheme-implementing agencies and to submit periodic compliance reports.'
    );
  }

  if (t.includes('pm-ajay') || t.includes('varanasi')) {
    return (
      'PM-AJAY Outreach in Varanasi – Information Note\n\n' +
      `An awareness camp related to the Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY) is being organised in Varanasi on ${eventDate}. The objective is to share accurate information about scheme components, ongoing projects and benefits with members of eligible communities.\n\n` +
      'Government officials and resource persons will interact with participants, clarify queries and encourage greater community participation so that the benefits of PM-AJAY reach the grassroots level in an effective and transparent manner.'
    );
  }

  if (t.includes('overseas')) {
    return (
      'National Overseas Scholarship – Extension of Last Date\n\n' +
      `This note concerns the extension of the last date for applications under the National Overseas Scholarship (NOS) scheme around ${eventDate}. The NOS scheme provides financial assistance to eligible students from specified categories to pursue Master’s, Ph.D. and research-level studies abroad in recognised institutions.\n\n` +
      'Candidates are advised to make use of the extended timeline, carefully check the updated schedule on the official portal and ensure that their online applications and documents meet all eligibility and documentation requirements mentioned in the guidelines.'
    );
  }

  if (t.includes('smile')) {
    return (
      'SMILE Scheme – Beneficiaries Reach New Milestone\n\n' +
      `This information note relates to the progress of the SMILE (Support for Marginalized Individuals for Livelihood and Enterprise) scheme around ${eventDate}. The scheme focuses on comprehensive rehabilitation of persons engaged in begging and transgender persons through shelter, counselling, health services, skill training and livelihood support.\n\n` +
      'A growing number of beneficiaries have been connected to shelters, health facilities and livelihood initiatives. Efforts will continue to expand SMILE interventions to more locations so that every deserving individual can move towards a life of dignity and self-reliance.'
    );
  }

  // generic
  return (
    'Ministry of Social Justice and Empowerment – Scholarship / DBT Update\n\n' +
    'This information note relates to a scholarship or Direct Benefit Transfer (DBT) update under the Ministry of Social Justice and Empowerment. The objective is to ensure timely and transparent financial assistance directly into the bank accounts of eligible students.\n\n' +
    'Beneficiaries are advised to refer to the full notification and designated online portals of the Ministry and their respective State/UT for detailed guidelines, eligibility conditions, important dates and instructions related to this announcement.'
  );
};

/* ---------- utilities for PDF ---------- */

const createFileNameSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'news';

const loadImageAsDataUrl = (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    // no crossOrigin needed for same-origin /emblem.png
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    };
    img.onerror = () => {
      console.error('Failed to load emblem from path:', src);
      reject(new Error('Failed to load emblem image'));
    };
    img.src = src;
  });

const formatTodayDate = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const generateNewsPdf = async (news: NewsItem) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // emblem at top-left
    try {
      const imgData = await loadImageAsDataUrl('/slider/emblem.png'); // must be in /public/slider
      doc.addImage(imgData, 'PNG', 15, 12, 22, 22);
    } catch (e) {
      console.warn('Proceeding without emblem in PDF:', e);
    }

    // ministry header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(
      'Ministry of Social Justice and Empowerment',
      40,
      20,
      { maxWidth: 160 }
    );

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Government of India', 40, 27);

    // separator line
    doc.setLineWidth(0.3);
    doc.line(15, 35, 195, 35);

    // header date = download date, not event date
    const today = formatTodayDate();
    doc.setFontSize(10);
    doc.text(`Date: ${today}`, 15, 42);

    // title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(news.title, 180);
    doc.text(titleLines, 15, 50);

    // body
    const body = getNewsPdfContent(news);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const bodyLines = doc.splitTextToSize(body, 180);
    doc.text(bodyLines, 15, 65);

    const fileName = `${createFileNameSlug(news.title)}.pdf`;
    doc.save(fileName);
  } catch (err) {
    console.error('PDF generation failed', err);
    alert('Unable to generate PDF. Please try again.');
  }
};

/* ================= HOME PAGE: NEWS + SCHEMES ================= */

const SchemesAndNews: React.FC<Props> = ({ currentLang, onNavigate }) => {
  const t = DICTIONARY[currentLang] || DICTIONARY['en'];

  return (
    <section className="py-14 bg-white" id="content">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* News Section - Left Column */}
          <div className="w-full lg:w-1/3" id="events-section">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 h-full overflow-hidden flex flex-col">
              {/* News Header */}
              <div className="p-5 bg-tiranga-blue text-white flex justify-between items-center shadow-sm">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calendar size={24} className="text-tiranga-saffron" />
                  {t.newsTitle}
                </h3>
                <button
                  onClick={() => onNavigate('/events')}
                  className="text-sm text-white/80 hover:text-white hover:underline bg-white/10 px-3 py-1 rounded transition-colors"
                >
                  {t.viewAll}
                </button>
              </div>

              {/* Scrollable News List */}
              <div className="flex-1 overflow-y-auto bg-gray-50 relative">
                <ul className="divide-y divide-gray-200">
                  {NEWS_ITEMS.map((news) => (
                    <li
                      key={news.id}
                      className="hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="group p-5">
                        {/* Main click area – opens news details page */}
                        <button
                          type="button"
                          onClick={() => onNavigate(`/news/${news.id}`)}
                          className="block w-full text-left"
                        >
                          <div className="flex items-start gap-4">
                            {/* Date Box */}
                            <div className="bg-white border border-gray-200 rounded p-1.5 text-center min-w-[60px]">
                              <span className="block text-xl font-bold text-tiranga-saffron leading-none">
                                {news.date.split(' ')[0]}
                              </span>
                              <span className="block text-xs uppercase text-gray-500 font-bold mt-1">
                                {news.date.split(' ')[1]}
                              </span>
                            </div>
                            {/* News Title */}
                            <div>
                              <span className="text-base text-gray-800 group-hover:text-tiranga-blue font-medium leading-snug block">
                                {news.title}
                              </span>
                              <span className="text-xs text-green-700 mt-2 inline-block bg-green-50 px-2 py-0.5 rounded border border-green-100 font-semibold">
                                New Update
                              </span>
                            </div>
                          </div>
                        </button>

                        {/* Download PDF */}
                        <div className="mt-3 flex justify-end">
                          <button
                            type="button"
                            onClick={() => generateNewsPdf(news)}
                            className="inline-flex items-center gap-2 text-xs font-medium text-tiranga-blue hover:text-tiranga-saffron hover:underline"
                          >
                            <FileText size={14} className="opacity-80" />
                            {t.downloadPdf || 'Download PDF'}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Schemes Section - Right Column */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-3 mb-8 pb-2 border-b border-gray-100">
              <div className="w-2 h-10 bg-gradient-to-b from-tiranga-saffron via-white to-tiranga-green border border-gray-200" />
              <h3 className="text-3xl font-bold text-gray-800">
                {t.schemesTitle}
              </h3>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SCHEMES.map((scheme) => {
                const hasExternalLink = Boolean((scheme as any).link);
                const href = hasExternalLink
                  ? (scheme as any).link
                  : `/scheme/${scheme.id}`;

                return (
                  <a
                    key={scheme.id}
                    href={href}
                    target={hasExternalLink ? '_blank' : '_self'}
                    rel={hasExternalLink ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      // If there is NO external link, use internal SPA navigation
                      if (!hasExternalLink) {
                        e.preventDefault();
                        onNavigate(`/scheme/${scheme.id}`);
                      }
                    }}
                    className="relative bg-white p-7 rounded-lg shadow-sm hover:shadow-xl border border-gray-100 transition-all group flex flex-col h-full overflow-hidden cursor-pointer"
                  >
                    {/* Decorative Tiranga stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-tiranga-saffron via-white to-tiranga-green opacity-70 group-hover:opacity-100" />

                    <div className="flex justify-between items-start mb-4 pl-2">
                      <div className="p-2.5 bg-blue-50 rounded-full text-tiranga-blue group-hover:bg-tiranga-saffron group-hover:text-white transition-colors">
                        <FileText size={24} />
                      </div>
                      <ExternalLink
                        size={20}
                        className="text-gray-400 group-hover:text-tiranga-green transition-colors"
                      />
                    </div>

                    <h4 className="font-bold text-xl text-gray-800 group-hover:text-tiranga-blue mb-3 pl-2 transition-colors">
                      {scheme.title}
                    </h4>
                    <p className="text-base text-gray-600 mb-5 flex-grow pl-2 leading-relaxed">
                      {scheme.description}
                    </p>

                    <div className="pl-2 mt-auto">
                      <span className="text-sm font-bold text-tiranga-blue uppercase tracking-wide flex items-center gap-2 group-hover:text-tiranga-saffron transition-colors">
                        {hasExternalLink ? 'Open Official Website' : 'Read More'}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchemesAndNews;

/* ================= DETAIL PAGE: /news/:id ================= */

interface NewsDetailProps {
  newsId: string | number;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ newsId }) => {
  const news = NEWS_ITEMS.find((item) => String(item.id) === String(newsId));

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">News item not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl bg-white rounded-xl shadow-md border border-gray-100 p-8">
        {/* Ministry header with EMBLEM */}
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
          <img
            src="/slider/emblem.png"
            alt="Ministry of Social Justice and Empowerment"
            className="w-14 h-14 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Ministry of Social Justice and Empowerment
            </h1>
            <p className="text-sm text-gray-600">Government of India</p>
          </div>
        </div>

        {/* Back + event date */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-tiranga-blue hover:text-tiranga-saffron"
          >
            <ArrowLeft size={16} />
            Back to News &amp; Events
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{news.date}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {news.title}
        </h2>

        {/* Detailed content */}
        {renderNewsContent(news)}

        {/* Download PDF (with download date in header) */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => generateNewsPdf(news)}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-tiranga-blue text-tiranga-blue hover:bg-tiranga-blue hover:text-white transition-colors"
          >
            <FileText size={18} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
