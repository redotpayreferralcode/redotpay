/**
 * RedotPay Referral Hub — Interactive Enhancements
 * Pure Vanilla JavaScript (<4KB) — Zero Dependencies
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Copy to Clipboard Functionality
  const copyButtons = document.querySelectorAll(".btn-copy");
  copyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const codeToCopy = button.getAttribute("data-code") || "sg6r9";
      
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(codeToCopy).then(() => {
          triggerCopySuccess(button);
        }).catch(() => {
          fallbackCopyText(codeToCopy, button);
        });
      } else {
        fallbackCopyText(codeToCopy, button);
      }
    });
  });

  function triggerCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg> Copied!
    `;
    button.classList.add("copied");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("copied");
    }, 2500);
  }

  function fallbackCopyText(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      triggerCopySuccess(button);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        
        // Close others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove("active");
          const otherBtn = otherItem.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("active");
          questionBtn.setAttribute("aria-expanded", "true");
        }
      });
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const isExpanded = navLinks.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });
  }

  // 4. Interactive Crypto Card Fee & Savings Calculator
  const calcAmount = document.getElementById("calc-amount");
  const calcCardType = document.getElementById("calc-card-type");
  const calcCurrency = document.getElementById("calc-currency");
  const calcIssuance = document.getElementById("res-issuance");
  const calcConversion = document.getElementById("res-conversion");
  const calcFx = document.getElementById("res-fx");
  const calcTotal = document.getElementById("res-total");

  if (calcAmount && calcCardType && calcCurrency) {
    function updateCalculations() {
      const amount = parseFloat(calcAmount.value) || 0;
      const isPhysical = calcCardType.value === "physical";
      const isNonUsd = calcCurrency.value === "non-usd";

      const issuanceFee = isPhysical ? 100.00 : 10.00;
      const conversionFee = amount * 0.01; // 1% crypto conversion fee
      const fxFee = isNonUsd ? amount * 0.012 : 0.00; // 1.2% FX fee for non-USD
      const totalCost = amount + issuanceFee + conversionFee + fxFee;

      if (calcIssuance) calcIssuance.textContent = `$${issuanceFee.toFixed(2)}`;
      if (calcConversion) calcConversion.textContent = `$${conversionFee.toFixed(2)}`;
      if (calcFx) calcFx.textContent = `$${fxFee.toFixed(2)}`;
      if (calcTotal) calcTotal.textContent = `$${totalCost.toFixed(2)}`;
    }

    calcAmount.addEventListener("input", updateCalculations);
    calcCardType.addEventListener("change", updateCalculations);
    calcCurrency.addEventListener("change", updateCalculations);
    updateCalculations();
  }
});
