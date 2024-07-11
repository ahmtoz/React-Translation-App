'use client'
import { useState, useEffect } from "react";
import countries from "../data";

const Translate = () => {
  // Giriş, çıkış ve dil seçimlerini yönetmek için durum kancaları
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("");
  const [translateTo, setTranslateTo] = useState("");

  const translate = async () => {
    // input, language-from ve language-to'nun boş olup olmadığını kontrol edin
    if (!fromText.trim() || !translateFrom || !translateTo) return;

    try {
      // Çeviri için API URL'si oluşturun
      const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;

      // API'den çeviri verilerini getirin
      const response = await fetch(apiUrl);
      const data = await response.json();

      //Çevrilmiş metni 'toText' durumuna ayarlayın
      setToText(data.matches[0]?.translation || data.responseData.translatedText);
    } catch (error) {
      // Çeviri hatalarını ele alın
      console.error("Translation error:", error);
    }
  };

  // Seçilen dilleri değiştiren ve giriş metnini güncelleyen fonksiyon
  const exchangeLanguages = () => {
    // Dil kodlarını değiştirin
    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);

    // Giriş alanındaki metni değiştir
    setFromText(toText);

    // Güncellenmiş dil kodları ve metin ile çeviriyi tetikleyin
    translate();
  };

  //İlk çeviriyi gerçekleştirmek ve girdi, "dil-den" veya "dil-e" değiştiğinde yeniden çalıştırmak için efekt kancası
  useEffect(() => {
    translate();
  }, [fromText, translateFrom, translateTo]);

  return (
    <div className="container">
      <div className="sm:mt-32 mt-32 bg-white border-2 border-slate-400 shadow-lg shadow-slate-400 rounded-lg p-5">
        <div className="flex items-center justify-center mb-4">
          <svg width="2rem" height="2rem" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect fill="#ffffff" height="60" rx="10" width="60" /><rect fill="#f1f3f4" height="30" rx="4" width="24" x="8" y="8" /><path d="M28,39.5H12A5.506,5.506,0,0,1,6.5,34V12A5.506,5.506,0,0,1,12,6.5H28A5.506,5.506,0,0,1,33.5,12V34A5.506,5.506,0,0,1,28,39.5ZM12,9.5A2.5,2.5,0,0,0,9.5,12V34A2.5,2.5,0,0,0,12,36.5H28A2.5,2.5,0,0,0,30.5,34V12A2.5,2.5,0,0,0,28,9.5Z" fill="#aaadbf" /><path d="M26,33.5a1.482,1.482,0,0,1-.77-.214C24.79,33.023,14.5,26.749,14.5,18a1.5,1.5,0,0,1,3,0c0,7.045,9.18,12.658,9.273,12.715A1.5,1.5,0,0,1,26,33.5Z" fill="#aaadbf" /><path d="M26,21H14a3,3,0,0,1,0-6H26a3,3,0,0,1,0,6Z" fill="#f1f3f4" /><path d="M28,19.5H12a1.5,1.5,0,0,1,0-3H28a1.5,1.5,0,0,1,0,3Z" fill="#aaadbf" /><path d="M20,19.5A1.5,1.5,0,0,1,18.5,18V14a1.5,1.5,0,0,1,3,0v4A1.5,1.5,0,0,1,20,19.5Z" fill="#aaadbf" /><path d="M14,33.5a1.5,1.5,0,0,1-.775-2.785C13.32,30.658,22.5,25.045,22.5,18a1.5,1.5,0,0,1,3,0c0,8.749-10.29,15.023-10.728,15.286A1.494,1.494,0,0,1,14,33.5Z" fill="#aaadbf" /><rect fill="#bec6f4" height="30" rx="4" width="24" x="28" y="22" /><path d="M48,53.5H32A5.506,5.506,0,0,1,26.5,48V26A5.506,5.506,0,0,1,32,20.5H48A5.506,5.506,0,0,1,53.5,26V48A5.506,5.506,0,0,1,48,53.5Zm-16-30A2.5,2.5,0,0,0,29.5,26V48A2.5,2.5,0,0,0,32,50.5H48A2.5,2.5,0,0,0,50.5,48V26A2.5,2.5,0,0,0,48,23.5Z" fill="#8d9cf4" /><path d="M28,49.5A1.5,1.5,0,0,1,26.5,48V26A5.506,5.506,0,0,1,32,20.5H48a1.5,1.5,0,0,1,0,3H32A2.5,2.5,0,0,0,29.5,26V48A1.5,1.5,0,0,1,28,49.5Z" fill="#7bcdd1" /><path d="M46,45.5a1.5,1.5,0,0,1-1.379-.909L40,33.808,35.379,44.591a1.5,1.5,0,0,1-2.758-1.182l6-14a1.5,1.5,0,0,1,2.758,0l6,14A1.5,1.5,0,0,1,46,45.5Z" fill="#f1f3f4" /><path d="M44,41.5H36a1.5,1.5,0,0,1,0-3h8a1.5,1.5,0,0,1,0,3Z" fill="#f1f3f4" /></svg>
          <div className="text-black font-semibold text-lg ml-2">Translate</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="">
            <select
              className="rounded font-semibold text-sm p-1"
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value)}
            >
              <option value="">Select Language</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
          <div className="" onClick={exchangeLanguages}>
            <svg width="1rem" height="1rem" viewBox="0 -1 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">

              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-420.000000, -6640.000000)" fill="#000000">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M369.152,6496.32302 L367.74,6494.843 C367.438,6494.52378 367.664,6494.00943 368.103,6494.00943 L383,6494.00943 C383.552,6494.00943 384,6493.55012 384,6492.99774 L384,6493.00374 C384,6492.45036 383.552,6492.00806 383,6492.00806 L368.118,6492.00806 C367.677,6492.00806 367.452,6491.46669 367.758,6491.14947 L369.162,6489.68947 C369.542,6489.2902 369.525,6488.65476 369.122,6488.27851 L369.12,6488.2745 C368.722,6487.90125 368.098,6487.92026 367.723,6488.31753 L364.546,6491.65782 C363.815,6492.43135 363.819,6493.64218 364.553,6494.41271 L367.702,6497.69296 C368.076,6498.08523 368.695,6498.10424 369.092,6497.73499 L369.102,6497.72498 C369.504,6497.35172 369.526,6496.72329 369.152,6496.32302 M378.898,6480.27502 L378.908,6480.26501 C379.305,6479.89576 379.924,6479.91477 380.298,6480.30704 L383.447,6483.58729 C384.182,6484.35782 384.185,6485.56865 383.455,6486.34318 L380.277,6489.68347 C379.903,6490.07974 379.279,6490.09975 378.881,6489.7275 L378.878,6489.7245 C378.475,6489.34824 378.458,6488.7148 378.839,6488.31653 L380.242,6486.85753 C380.548,6486.53931 380.323,6486.00395 379.882,6486.00395 L365,6486.00395 C364.448,6486.00395 364,6485.56164 364,6485.00826 L364,6485.00626 C364,6484.45389 364.448,6484.00258 365,6484.00258 L379.897,6484.00258 C380.336,6484.00258 380.562,6483.48222 380.26,6483.163 L378.848,6481.67398 C378.474,6481.27371 378.496,6480.64828 378.898,6480.27502" id="arrow_right_left-[#343]">

                    </path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className="">
            {/* 'to' seçimi için dil seçenekleri */}
            <select
              className="rounded font-semibold text-sm p-1"
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
            >
              <option value="">Translate</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Giriş için örnek metin alanı */}
        <textarea
          className="w-full border-2 mt-3 rounded-lg p-3 h-32"
          spellCheck="false"
          value={fromText}
          onChange={(e) => setFromText(e.target.value)}
          placeholder="Enter text"
        ></textarea>

        {/* Çeviri sonucu için örnek metin alanı */}
        <textarea
          className="w-full border-2 mt-3 rounded-lg p-3 h-32"
          spellCheck="false"
          readOnly
          disabled
          value={toText}
          placeholder="Translation"
        ></textarea>
      </div>
    </div>
  );
};

export default Translate;