import React from "react";
import { LanguageCode } from "../types";
// @ts-ignore
import styles from "./HelpCenters.module.css";

interface HelpCentersProps {
  currentLang: LanguageCode;
}

interface FAQItem {
  question: string;
  answers: string[];
}

// ✅ ENGLISH FAQ CONTENT (includes your 1–5 questions + more)
const FAQ_EN: FAQItem[] = [
  {
    question: "Why is Aadhaar seeding important for DBT and scholarships?",
    answers: [
      "Your bank account must be correctly linked (seeded) with your Aadhaar number so that DBT amounts (scholarships, subsidies, etc.) can be credited without failure.",
      "If Aadhaar is not properly seeded or is linked to the wrong or inactive account, your payment may get rejected, returned or delayed."
    ]
  },
  {
    question: "How can I check if my Aadhaar is correctly linked with my bank account?",
    answers: [
      "Visit your bank branch and ask them to confirm whether your Aadhaar is linked to your account.",
      "You can also use official channels such as bank SMS, IVR or Net Banking (if available) to check Aadhaar seeding status.",
      "If you are not sure, you can visit a CSC / Help Centre with your Aadhaar card and bank passbook and ask the operator to guide you."
    ]
  },
  {
    question: "What common mistakes can lead to DBT / scholarship cancellation or payment failure?",
    answers: [
      "Entering the wrong bank account number or IFSC code in the scholarship / DBT form.",
      "Using a closed, frozen or dormant bank account for DBT.",
      "Name or date of birth not matching between Aadhaar, bank account and scholarship application.",
      "Submitting false, incomplete or mismatched income, caste or education documents.",
      "Filling multiple applications for the same scholarship by the same student from different accounts."
    ]
  },
  {
    question: "What should I do if my scholarship is not coming even after approval?",
    answers: [
      "First, check your application status on the official portal (such as NSP or the State scholarship portal).",
      "If the status shows 'approved but payment not initiated', wait for the payment cycle or contact your institute.",
      "If the status shows 'payment failed' or 'rejected by bank', note the error message carefully.",
      "Visit your bank or a CSC with your documents to correct your bank details or Aadhaar seeding, then update details on the portal if required."
    ]
  },
  {
    question: "When should I visit a CSC / Help Centre?",
    answers: [
      "When you are not able to submit or correct your application online by yourself.",
      "When you need help in scanning / uploading documents or printing the acknowledgement.",
      "When your DBT payment is repeatedly failing and you need guidance to correct bank / Aadhaar details.",
      "When you do not understand the error messages or status shown on the portal and want in-person help."
    ]
  },
  {
    question: "What is DBT (Direct Benefit Transfer) and why is it important?",
    answers: [
      "DBT ensures that government benefits and scholarships are transferred directly to your bank account without any middleman.",
      "It increases transparency, reduces chances of fraud and helps you receive money safely and on time."
    ]
  },
  {
    question: "How can I link (seed) my Aadhaar with my bank account?",
    answers: [
      "Visit your bank branch with your Aadhaar card and bank passbook and submit an Aadhaar seeding request form.",
      "Many banks also allow Aadhaar linking via ATM, mobile banking or net banking.",
      "If you are confused, visit the nearest CSC / Help Centre and they will guide you step by step."
    ]
  },
  {
    question: "Which documents should I carry when visiting a CSC / Help Centre?",
    answers: [
      "Aadhaar card and bank passbook.",
      "Passport-size photograph.",
      "Caste, income and domicile certificates (if applicable).",
      "Latest marksheet or Institute / College ID card.",
      "Mobile number linked with Aadhaar, if possible."
    ]
  },
  {
    question: "How can I check whether my DBT payment has reached my bank account?",
    answers: [
      "Check your bank passbook or take a mini statement from the bank or ATM.",
      "You can also visit the PFMS portal and use your bank account number or application ID to track your DBT payment status.",
      "If the portal shows that payment is credited but your passbook does not show it, contact your bank immediately."
    ]
  },
  {
    question: "Why does payment sometimes take time even after my application is verified?",
    answers: [
      "After your application is verified by the institute and authorities, it goes through PFMS and NPCI before reaching your bank.",
      "If all details (Aadhaar, bank account, IFSC) are correct, the amount is credited to your bank account in the payment cycle.",
      "If there is any mismatch, the payment may fail and return to the source; in such cases, you must correct your details."
    ]
  },
  {
    question: "How can CSCs help me with DBT and scholarship issues?",
    answers: [
      "Filling new scholarship applications on NSP or State scholarship portals.",
      "Correcting basic details like name, address and bank account details in your forms (where allowed).",
      "Scanning and uploading your documents in the correct format and size.",
      "Checking your application status and DBT payment status and printing receipts or acknowledgement.",
      "Guiding you on what to do if payment has failed or application is rejected."
    ]
  },
  {
    question: "How can I stay safe from fraud while dealing with DBT and scholarships?",
    answers: [
      "Never share your OTP, ATM PIN or net banking password with anyone – not even with CSC operators or bank staff.",
      "Do not pay any bribe or unofficial fee to get your scholarship approved. All official fees (if any) are clearly mentioned on government portals.",
      "Always use official government portals and verified CSC centres. If you feel something is suspicious, report it to authorities."
    ]
  },
  {
    question: "How do I use this page to find help quickly?",
    answers: [
      "First, read the FAQs on this left side to understand common issues and solutions regarding Aadhaar seeding, DBT and scholarships.",
      "Then, use the 'Find Nearby CSC' panel on the right side of this page. Enter a valid Indian PIN code to locate Common Service Centres near you.",
      "Visit the nearest CSC with all your documents so that your issues can be resolved face-to-face."
    ]
  }
];

// ✅ HINDI FAQ CONTENT (same questions, in Hindi)
const FAQ_HI: FAQItem[] = [
  {
    question: "DBT और छात्रवृत्ति के लिए आधार सीडिंग क्यों ज़रूरी है?",
    answers: [
      "आपके बैंक खाते को आपके आधार नंबर से सही तरीके से लिंक (सीड) होना चाहिए ताकि DBT राशि (छात्रवृत्ति, सब्सिडी आदि) बिना रुकावट सीधे खाते में आ सके।",
      "यदि आधार ठीक से सीड नहीं है या किसी गलत / निष्क्रिय खाते से लिंक है, तो आपका भुगतान अस्वीकृत या वापस हो सकता है।"
    ]
  },
  {
    question: "मैं कैसे जाँचूँ कि मेरा आधार मेरे बैंक खाते से सही तरीके से लिंक है या नहीं?",
    answers: [
      "अपने बैंक शाखा में जाकर पूछें कि आपका आधार आपके खाते से सीड है या नहीं।",
      "कई बैंक SMS, IVR या नेट बैंकिंग के माध्यम से आधार सीडिंग की स्थिति दिखाते हैं।",
      "आप आधार कार्ड और बैंक पासबुक लेकर किसी CSC / हेल्प सेंटर पर भी जा सकते हैं, जहाँ ऑपरेटर आपको सीडिंग की स्थिति समझा सकता है।"
    ]
  },
  {
    question: "कौन-कौन सी सामान्य गलतियाँ DBT / छात्रवृत्ति रद्द होने या भुगतान फेल होने का कारण बनती हैं?",
    answers: [
      "फॉर्म में गलत बैंक खाता संख्या या IFSC कोड भरना।",
      "बंद, फ्रीज़ या निष्क्रिय बैंक खाते का उपयोग करना।",
      "आधार, बैंक खाता और छात्रवृत्ति आवेदन में नाम या जन्म-तिथि का मेल न होना।",
      "आय, जाति या शिक्षा से जुड़े गलत / मेल न खाते दस्तावेज़ लगाना।",
      "एक ही छात्र द्वारा एक ही छात्रवृत्ति के लिए कई आवेदन करना।"
    ]
  },
  {
    question: "यदि मेरा छात्रवृत्ति भुगतान स्वीकृत होने के बाद भी नहीं आ रहा है तो क्या करूँ?",
    answers: [
      "सबसे पहले आधिकारिक पोर्टल (जैसे NSP या राज्य पोर्टल) पर अपने आवेदन की स्थिति देखें।",
      "यदि स्टेटस में 'approved' दिख रहा है लेकिन भुगतान नहीं आया है, तो भुगतान चक्र तक प्रतीक्षा करें या संस्थान से संपर्क करें।",
      "यदि 'payment failed' या 'rejected by bank' लिखा है, तो कारण ध्यान से पढ़ें और बैंक या CSC जाकर विवरण सुधारें।"
    ]
  },
  {
    question: "मुझे CSC / हेल्प सेंटर कब जाना चाहिए?",
    answers: [
      "जब आप स्वयं ऑनलाइन आवेदन जमा करने या सुधार करने में सक्षम न हों।",
      "जब आपको दस्तावेज़ स्कैन / अपलोड करने या प्रिंट निकालने में मदद चाहिए।",
      "जब आपका DBT भुगतान बार-बार फेल हो रहा हो और आपको बैंक / आधार विवरण सुधारने के लिए मार्गदर्शन चाहिए।",
      "जब पोर्टल पर दिख रही त्रुटि या स्टेटस आपको समझ में न आ रहा हो।"
    ]
  },
  {
    question: "DBT (डायरेक्ट बेनिफिट ट्रांसफर) क्या है और यह क्यों महत्वपूर्ण है?",
    answers: [
      "DBT के माध्यम से छात्रवृत्ति और सरकारी लाभ सीधे आपके बैंक खाते में भेजे जाते हैं, जिससे बिचौलियों की भूमिका समाप्त होती है।",
      "इससे पारदर्शिता बढ़ती है, धोखाधड़ी कम होती है और पैसा सुरक्षित तथा समय पर मिल पाता है।"
    ]
  },
  {
    question: "आधार को बैंक खाते से कैसे लिंक (सीड) किया जा सकता है?",
    answers: [
      "अपने बैंक शाखा में जाकर आधार कार्ड और बैंक पासबुक के साथ आधार सीडिंग का अनुरोध करें।",
      "कई बैंक ATM, मोबाइल बैंकिंग या नेट बैंकिंग के माध्यम से भी आधार लिंक करने की सुविधा देते हैं।",
      "यदि प्रक्रिया समझ में न आए तो नज़दीकी CSC / हेल्प सेंटर जाकर सहायता लें।"
    ]
  },
  {
    question: "CSC / हेल्प सेंटर जाते समय कौन-कौन से दस्तावेज़ साथ लेकर जाएँ?",
    answers: [
      "आधार कार्ड और बैंक पासबुक।",
      "पासपोर्ट आकार का फोटो।",
      "जाति, आय और निवास प्रमाणपत्र (यदि लागू हो)।",
      "मार्कशीट या कॉलेज / संस्थान का ID कार्ड।",
      "आधार से लिंक मोबाइल नंबर (यदि उपलब्ध हो)।"
    ]
  },
  {
    question: "मैं कैसे देख सकता हूँ कि मेरी DBT राशि बैंक खाते में आई है या नहीं?",
    answers: [
      "बैंक पासबुक में एंट्री करवाकर या मिनी स्टेटमेंट निकालकर जाँच करें।",
      "PFMS पोर्टल पर जाकर खाते का नंबर या आवेदन ID डालकर DBT भुगतान की स्थिति देखी जा सकती है।",
      "यदि पोर्टल पर 'credited' दिख रहा हो लेकिन पासबुक में एंट्री न हो, तो तुरंत बैंक से संपर्क करें।"
    ]
  },
  {
    question: "स्वीकृति के बाद भी भुगतान में कभी-कभी समय क्यों लगता है?",
    answers: [
      "आपका भुगतान PFMS और NPCI के माध्यम से प्रोसेस होकर बैंक तक पहुँचता है, जिसमें कुछ समय लग सकता है।",
      "यदि सभी विवरण (आधार, बैंक खाता, IFSC) सही हैं, तो राशि आपके खाते में जमा हो जाती है।",
      "यदि किसी विवरण में गलती हो, तो भुगतान असफल होकर वापस लौट सकता है और आपको विवरण सुधारने की आवश्यकता होगी।"
    ]
  },
  {
    question: "CSC केंद्र DBT और छात्रवृत्ति से जुड़ी समस्याओं में कैसे मदद कर सकते हैं?",
    answers: [
      "NSP या राज्य पोर्टलों पर नए छात्रवृत्ति आवेदन भरवाना।",
      "नाम, पता, बैंक खाता विवरण जैसी जानकारी में सुधार कराना (जहाँ अनुमति हो)।",
      "दस्तावेज़ स्कैन करके सही प्रारूप में अपलोड कराना।",
      "आवेदन और भुगतान की स्थिति जाँचकर रसीद / स्टेटस की प्रिंट देना।",
      "यदि भुगतान फेल हुआ है या आवेदन अस्वीकृत है, तो आगे क्या करना है इस पर मार्गदर्शन देना।"
    ]
  },
  {
    question: "DBT और छात्रवृत्ति के मामलों में धोखाधड़ी से कैसे बचें?",
    answers: [
      "अपना OTP, ATM PIN या नेट बैंकिंग पासवर्ड किसी के साथ साझा न करें, यहाँ तक कि CSC ऑपरेटर या बैंक कर्मचारी के साथ भी नहीं।",
      "छात्रवृत्ति स्वीकृत कराने के नाम पर किसी को रिश्वत या अनौपचारिक शुल्क न दें।",
      "हमेशा आधिकारिक सरकारी पोर्टल और प्रमाणित CSC केंद्रों का ही उपयोग करें।"
    ]
  },
  {
    question: "मैं इस पेज का उपयोग करके जल्दी सहायता कैसे प्राप्त कर सकता/सकती हूँ?",
    answers: [
      "सबसे पहले बाईं ओर दिए गए प्रश्नोत्तर (FAQ) ध्यान से पढ़ें, ताकि आधार सीडिंग, DBT और छात्रवृत्ति से जुड़ी सामान्य जानकारी समझ सकें।",
      "इसके बाद दाईं ओर दिए गए 'नज़दीकी CSC खोजें' पैनल में अपना PIN कोड दर्ज करें और निकटतम CSC केंद्र देखें।",
      "सभी ज़रूरी दस्तावेज़ लेकर नज़दीकी CSC पर जाएँ ताकि आपकी समस्या का समाधान आमने-सामने हो सके।"
    ]
  }
];

const HelpCenters: React.FC<HelpCentersProps> = ({ currentLang }) => {
  const isHindi = currentLang === "hi";
  const faq = isHindi ? FAQ_HI : FAQ_EN;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Scrollable FAQ panel */}
        <div className="bg-white shadow rounded-2xl border border-gray-200 flex flex-col max-h-[80vh]">
          <div className="px-6 pt-6 pb-3 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {isHindi
                ? "हेल्प सेंटर – DBT / छात्रवृत्ति सहायता"
                : "Help Centres – DBT / Scholarship Support"}
            </h1>
            <p className="text-sm text-gray-600">
              {isHindi
                ? "नीचे दिए गए प्रश्नोत्तर ध्यान से पढ़ें, और अधिक सहायता के लिए दाईं ओर दिए गए CSC लोकेटर से नज़दीकी केंद्र खोजें।"
                : "Read the FAQs carefully, and use the CSC locator on the right to find a nearby centre for in-person help."}
            </p>
          </div>

          <div className="px-6 py-4 space-y-4 overflow-y-auto">
            {faq.map((item, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                <div className="flex gap-2 items-start">
                  <span className="mt-1 text-xs font-semibold text-blue-700">
                    {isHindi ? `प्रश्न ${index + 1}.` : `Q${index + 1}.`}
                  </span>
                  <p className="font-medium text-gray-900 leading-snug">
                    {item.question}
                  </p>
                </div>
                <div className="mt-2 space-y-1">
                  {item.answers.map((ans, i) => (
                    <p key={i} className="text-sm text-gray-700 leading-relaxed">
                      {ans}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: CSC Locator */}
        <div className="bg-white shadow rounded-2xl border border-gray-200 flex flex-col">
          <div className="px-6 pt-6 pb-3 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {isHindi ? "नज़दीकी CSC / हेल्प सेंटर खोजें" : "Find Nearby CSC / Help Centre"}
            </h2>
            <p className="text-sm text-gray-600">
              {isHindi
                ? "नीचे दिए गए आधिकारिक CSC लोकेटर में भारत का कोई मान्य PIN कोड दर्ज करें और अपने आसपास के कॉमन सर्विस सेंटर देखें।"
                : "Enter any valid Indian PIN code in the official CSC locator below to find Common Service Centres near you."}
            </p>
          </div>
          <div className="flex-1 min-h-[480px]">
            <iframe
              src="https://locator.csccloud.in/"
              title="CSC Locator"
              className={`w-full h-full rounded-b-2xl ${styles.iframeContainer}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenters;
