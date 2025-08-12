import {useState} from "react";
import {BsArrowDown} from "react-icons/bs";

export default function FAQComponent(){
    const faqs = [
        { q: 'How safe is my investment?', a: 'Your funds are invested in diversified low-risk portfolios.' },
        { q: 'When do I get my returns?', a: 'Returns are credited monthly directly to your account.' },
        { q: 'Can I withdraw early?', a: 'Yes, but early withdrawals may have a small penalty.' }
    ];

    const [openFAQ, setOpenFAQ] = useState(null);

    return (
        <section className="py-16">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                            >
                                <span className="font-medium">{faq.q}</span>
                                <BsArrowDown className={`transform transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${openFAQ === i ? 'max-h-40 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0 p-0'}`}
                            >
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
