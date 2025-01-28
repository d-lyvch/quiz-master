import React,{ useEffect, useState } from "react";


const CookieParser = () => {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent')
        if (!consent) {
            setShowConsent(true)
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setShowConsent(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setShowConsent(false);
    };

    return (
        showConsent && (
            <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex flex-col items-center justify-center">
                <p className="text-center mb-4">We use cookies to improve your experience. By using our site, you accept our cookie policy. 
                </p>
                <div className="flex gap-2 mt-2 justify-center">
                <button onClick={handleAccept} className="bg-blue-500 text-white p-2 rounded">
                    Accept
                </button>
                <button onClick={handleDecline} className="bg-red-500 text-white p-2 rounded">
                    Decline
                </button>
            </div>
            </div>
        )
    );
};

export default CookieParser; 