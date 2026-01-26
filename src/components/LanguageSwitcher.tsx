"use client";

import { useEffect } from "react";

export default function LanguageSwitcher() {
    useEffect(() => {
        // Check if script is already added
        if (document.getElementById("google-translate-script")) return;

        const googleTranslateElementInit = () => {
            // @ts-ignore
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,hi,de,fr,es,zh-CN,ar,ru,ja,pt", // 10 major languages
                    layout: 0, // Simple layout
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        // @ts-ignore
        window.googleTranslateElementInit = googleTranslateElementInit;

        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="flex items-center">
            <div id="google_translate_element" className="google-translate-custom" />
            <style jsx global>{`
        /* Hide Google branding and customize look */
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
        }
        .goog-te-gadget .goog-te-combo {
          margin: 0;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #ffffff40;
          background: #ffffff10;
          color: white;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 12px;
          outline: none;
          cursor: pointer;
        }
        .goog-te-gadget .goog-te-combo option {
            color: black;
        }
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
      `}</style>
        </div>
    );
}
